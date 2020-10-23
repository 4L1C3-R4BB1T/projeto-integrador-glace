
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteModel } from './model/cliente-model';
import { ClienteRepository } from './repository/cliente-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  providers: [MessageService]
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('upload') upload: ElementRef;
  public formulario: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  imagem: number;
    
  public submitted: boolean = false;

  uploadedFiles: any[] = [];

  mensagem: Message[] = [];

  operacao: boolean = true;

  constructor(
    private repository: ClienteRepository,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNasc: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarsenha: ['', Validators.required],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });
  }

  cadastrar() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    this.salvar();
  };

  salvar() {

    const formData: any = new FormData();
    formData.append('imagem', this.uploadedFiles[0]);
     
    this.repository.postImagem(formData).subscribe(resposta => {      
      this.imagem = resposta.id;

    const dados = {
      id: this.formulario.value.id,
      nome: this.formulario.value.nome,
      sobrenome: this.formulario.value.sobrenome,
      cpf: this.formulario.value.cpf,
      dataNasc: this.formulario.value.dataNasc,
      telefone: this.formulario.value.telefone,
      email: this.formulario.value.email,
      senha: this.formulario.value.senha,
      endereco: {
        cep: this.formulario.value.cep,
        rua: this.formulario.value.rua,
        numero: this.formulario.value.numero,
        bairro: this.formulario.value.bairro,
        cidade: {
          id: this.formulario.value.cidade
        }
      },
      foto: {
        id: this.imagem
      }

        } as ClienteModel;

        if (dados.id) {
          this.repository.putCliente(dados).subscribe(resposta => {
            this.limparFormulario();
          });
        } else {
          this.repository.postCliente(dados).subscribe(resposta => {
            this.mensagem = [
              {
                severity: 'success',
                summary: 'CLIENTE',
                detail: 'cadastrado com sucesso!'
              }];
            this.limparFormulario();
          },
          (e) => {
              var msg: any[] = [];
              //Erro Principal
              msg.push({
                severity: 'error',
                summary: 'ERRO',
                detail: e.error.userMessage
              });
              //Erro de cada atributo
              var erros = e.error.objects;
              erros.forEach(function (elemento) {
                msg.push(
                  {
                    severity: 'error',
                    summary: 'ERRO',
                    detail: elemento.userMessage
                  });
              });
              this.mensagem = msg;
            }
          );
        }
        
      });     
    }

    listarEstados() {
      this.repository.getAllEstados().subscribe(resposta => {
        this.estados.push({ label: resposta.nome, value: resposta.id });
      });
    }
    listarCidades() {
      this.cidades = [];
      let id: number = this.formulario.value.estado;
      this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
        this.cidades.push({ label: resposta.nome, value: resposta.id });
      });
    }

    limparFormulario() {
      this.submitted = false;
      this.formulario.reset();
      this.cidades = [];
      this.estados = [];
      this.listarEstados();
      (this.upload as any).clear();
    }

    enviarImagem(evento){
      this.uploadedFiles = [];
      
      for(let file of evento.files) {
        this.uploadedFiles.push(file);
      }    
      
    }

 }

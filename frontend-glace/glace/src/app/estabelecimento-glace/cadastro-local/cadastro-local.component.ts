import { EstabelecimentoRepository } from '../repository/estabelecimento-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-cadastro-local',
  templateUrl: './cadastro-local.component.html',
  styleUrls: ['./cadastro-local.component.css'],
  providers: [MessageService]
})
export class CadastroLocalComponent implements OnInit {

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
    private repository: EstabelecimentoRepository,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      nome: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],
    });
  }

  cadastrar() {
    console.log("aqui");
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    
    this.salvar();
  };

  salvar() {
    const dados = {
      id: this.formulario.value.id,
      nome: this.formulario.value.nome,
      endereco: {
        cep: this.formulario.value.cep,
        rua: this.formulario.value.rua,
        numero: this.formulario.value.numero,
        bairro: this.formulario.value.bairro,
        cidade: {
          id: this.formulario.value.cidade
        }
      }
        } as EstabelecimentoModel;

        if (dados.id) {
          this.repository.putEstabelecimento(dados).subscribe(resposta => {
            this.limparFormulario();
          });
        } else {
          this.repository.postEstabelecimento(1, dados).subscribe(resposta => {
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
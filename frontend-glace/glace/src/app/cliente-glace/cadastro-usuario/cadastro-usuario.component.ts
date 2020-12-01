import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteModel } from './../model/cliente-model';
import { ClienteRepository } from './../repository/cliente-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message,MessageService} from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
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
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  //iniciar o formulário e a lista de estados
  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
    const codigocliente = this.route.snapshot.params['codigo'];
    if (codigocliente){
      this.operacao = false;
      this.carregarCliente(codigocliente);
    }
  }

  carregarCliente(codigoCliente: number){
    this.repository.getClienteById(codigoCliente).subscribe(resposta => {

      this.formulario.controls.id.setValue(resposta.id);
      this.formulario.controls.nome.setValue(resposta.nome);
      this.formulario.controls.sobrenome.setValue(resposta.sobrenome);
      this.formulario.controls.cpf.setValue(resposta.cpf);
      this.formulario.controls.dataNasc.setValue(resposta.dataNasc);
      this.formulario.controls.telefone.setValue(resposta.telefone);
      this.formulario.controls.email.setValue(resposta.email);
      this.formulario.controls.cep.setValue(resposta.endereco.cep);
      this.formulario.controls.rua.setValue(resposta.endereco.rua);
      this.formulario.controls.numero.setValue(resposta.endereco.numero);
      this.formulario.controls.bairro.setValue(resposta.endereco.bairro);
      this.formulario.controls.cidade.setValue(resposta.endereco.cidade.estado.id);

      this.listarCidadeSelecionada(resposta.endereco.cidade.id);

      this.imagem = resposta.foto.id;

      this.title.setTitle(`Edição do Perfil cliente: ${this.formulario.value.nome}`)
    });
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
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
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
  }

  salvar() {
    if (this.imagem && !this.uploadedFiles[0]){
      this.salvarOuAtualizar();

    } else {
      const foto: any = this.uploadedFiles[0];
      const formData: any = new FormData();

      formData.append('imagem', foto);

      this.repository.postImagem(formData).subscribe(resposta => {
        this.imagem = resposta.id;
        this.salvarOuAtualizar();
      })
    }
  }

  salvarOuAtualizar () {
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
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'CLIENTE',
          detail: 'atualizado com sucesso!'
        });

        this.limparFormulario();
        },
        (e) => {
          var msg: any[] = [];
          //Erro Principal
          msg.push({
          key: 'toast',
          severity: 'error',
          summary: 'ERRO',
          detail: e.error.userMessage
        }
      );

      //Erro de cada atributo
      var erros = e.error.objects;
      erros.forEach(function (elemento) {
        msg.push({
          key: 'toast',
          severity: 'error',
          summary: 'ERRO',
          detail: elemento.userMessage
        });
      });

      this.messageService.addAll(msg);
    });
  } else {
    this.repository.postCliente(dados).subscribe(resposta => {
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'CLIENTE',
          detail: 'cadastrado com sucesso!'
        });
        //window.scrollTo(0, 0);
        this.limparFormulario();
        },
        (e) => {
          var msg: any[] = [];
          //Erro Principal
          msg.push({
            key: 'toast',
            severity: 'error',
            summary: 'ERRO',
            detail: e.error.userMessage
          });
          //Erro de cada atributo
          var erros = e.error.objects;
          erros.forEach(function (elemento) {
            msg.push({
              key: 'toast',
              severity: 'error',
              summary: 'ERRO',
              detail: elemento.userMessage
            });
          });
          this.messageService.addAll(msg);
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

  listarCidadeSelecionada(idCidade: number) {
    this.cidades = [];

    let id: number = this.formulario.value.estado;

    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
      this.formulario.controls.cidade.setValue(idCidade);
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

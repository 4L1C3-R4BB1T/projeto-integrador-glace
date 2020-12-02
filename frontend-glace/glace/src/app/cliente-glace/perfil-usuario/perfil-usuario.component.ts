import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../seguranca/auth.service';
import { ClienteModel } from '../model/cliente-model';
import { ClienteRepository } from '../repository/cliente-repository';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReservaModel } from '../../estabelecimento-glace/model/reserva-model';
import { ReservaRepository } from '../../estabelecimento-glace/repository/reserva-repository';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  @ViewChild('upload') upload: ElementRef;

  public formulario: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  imagem: number;

  public submitted: boolean = false;
  uploadedFiles: any[] = [];
  mensagem: Message[] = [];
  operacao: boolean = true;
  usuario: string = '';
  uploadFiles: any[] = [];

  reservas: ReservaModel[] = [];
  loading: boolean;
  @ViewChild('dt') table: Table;

  constructor(
    public service: AuthService,
    private repository: ClienteRepository,
    private repositoryReserva: ReservaRepository,
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private confirmarService: ConfirmationService,
    private title: Title
  ) { this.usuario = service.jwtPayload ? service.jwtPayload.nome_completo : ''; }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
    this.carregarReservas();  
    

    const codigoCliente = this.route.snapshot.params['codigo'];
    
    //Pegando o id do usuario através do token
    const codigo = this.service.jwtPayload.usuario_id;

    this.title.setTitle('Novo cliente');

    if (codigoCliente) {
      this.operacao = false;
      this.carregarCliente(codigoCliente);
    } else if (codigo) {
      this.operacao = false;
      this.carregarCliente(codigo);
    }
  }

  carregarCliente(codigoCliente: number) {
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
      this.formulario.controls.estado.setValue(resposta.endereco.cidade.estado.id);
      this.formulario.controls.senhaB.setValue(resposta.senha);
      this.listarCidadeSelecionada(resposta.endereco.cidade.id);
      this.imagem = resposta.foto.id;
    });
  }

  logout() {
    this.service.logout();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      nome: [''],
      sobrenome: [''],
      cpf: [''],
      dataNasc: [''],
      telefone: [''],
      email: [''],
      senha: [''],
      senhaB:[''],
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
    if (this.imagem && !this.uploadedFiles[0]) {
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

  salvarOuAtualizar() {
    if (this.formulario.value.senha == ''){
      const dados = {
        id: this.formulario.value.id,
        nome: this.formulario.value.nome,
        sobrenome: this.formulario.value.sobrenome,
        cpf: this.formulario.value.cpf,
        dataNasc: this.formulario.value.dataNasc,
        telefone: this.formulario.value.telefone,
        email: this.formulario.value.email,
        senha: this.formulario.value.senhaB,
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
          this.messageService.add(
            {
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
            this.messageService.addAll(msg);
          }
        );
      }
    }else{
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
          this.messageService.add(
            {
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
            this.messageService.addAll(msg);
          }
        );
      }
    }
    
  }

  limparFormulario() {
    this.submitted = false;
    this.formulario.reset();
    this.cidades = [];
    this.estados = [];
    this.listarEstados();
    (this.upload as any).clear();
  }

  listarCidades() {
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }

  listarEstados() {
    this.repository.getAllEstados().subscribe(resposta => {
      this.estados.push({ label: resposta.nome, value: resposta.id });
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

  enviarImagem(evento) {
    this.uploadedFiles = [];
    for (let file of evento.files) {
      this.uploadedFiles.push(file);
    }
  }

  carregarReservas(){
    this.reservas = [];
    this.repositoryReserva.getAllReservasByCliente(this.service.jwtPayload.usuario_id).then(resposta => {
      this.reservas = resposta;
      this.loading = false;       
    });  
  }

  excluir(id: number){
    this.repositoryReserva.deleteReserva(id).subscribe( resposta => {
      this.messageService.add( 
        {
          key: 'toast',
          severity: 'success',
          summary: 'RESERVA',
          detail: 'cancelada com sucesso!'
        });   
        this.carregarReservas();
    });
  }

}

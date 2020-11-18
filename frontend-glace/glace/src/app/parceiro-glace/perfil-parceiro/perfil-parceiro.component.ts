import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ParceiroModel } from '../model/parceiro-model';
import { ParceiroRepository } from '../repository/parceiro-repository';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { EstabelecimentoModel } from 'src/app/estabelecimento-glace/model/estabelecimento-model';
import { EstabelecimentoRepository } from 'src/app/estabelecimento-glace/repository/estabelecimento-repository';

@Component({
  selector: 'app-perfil-parceiro',
  templateUrl: './perfil-parceiro.component.html',
  styleUrls: ['./perfil-parceiro.component.css']
})
export class PerfilParceiroComponent implements OnInit {
  @ViewChild('upload') upload: ElementRef;

  public formulario: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  imagem: number;
  tipoEstabelecimento: any[] = [];

  public submitted: boolean = false;
  uploadedFiles: any[] = [];
  mensagem: Message[] = [];
  operacao: boolean = true;
  usuario: string = '';
  uploadFiles: any[] = [];

  constructor(
    public service: AuthService,
    private repository: ParceiroRepository,
    private repositoryEstabelecimento: EstabelecimentoRepository,
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private title: Title
  ) { this.usuario = service.jwtPayload ? service.jwtPayload.nome_completo : ''; }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();

    const codigoParceiro = this.route.snapshot.params['codigo'];

    //Pegado id do parceiro por meio do token
    const codigo = this.service.jwtPayload.usuario_id;

    this.title.setTitle('Novo Parceiro');

    if (codigoParceiro) {
      this.operacao = false;
      this.carregarParceiro(codigoParceiro);
    } else if (codigo) {
      this.operacao = false;
      this.carregarParceiro(codigo);
    }
  }

  carregarParceiro(codigoParceiro: number) {
    this.repository.getParceiroById(codigoParceiro).subscribe(resposta => {
      this.formulario.controls.id.setValue(resposta.id);
      this.formulario.controls.razao.setValue(resposta.razao);
      this.formulario.controls.cnpj.setValue(resposta.cnpj);
      this.formulario.controls.telefone.setValue(resposta.telefone);
      this.formulario.controls.email.setValue(resposta.email);
      this.formulario.controls.senha.setValue(resposta.senha);
      this.formulario.controls.cep.setValue(resposta.endereco.cep);
      this.formulario.controls.rua.setValue(resposta.endereco.rua);
      this.formulario.controls.numero.setValue(resposta.endereco.numero);
      this.formulario.controls.bairro.setValue(resposta.endereco.bairro);
      this.formulario.controls.estado.setValue(resposta.endereco.cidade.estado.id);
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
      razao: [''],
      cnpj: [''],
      telefone: [''],
      email: [''],
      senha: [''],
      confirmarsenha: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      cidadeEstabelecimento: [''],
      estado: [''],
      estadoEstabelecimento: [''],
      nomeEstabelecimento: [''],
      telefoneEstabelecimento: [''],
      cepEstabelecimento: [''],
      ruaEstabelecimento: [''],
      tipoEstabelecimento: [''],
      cnpjEstabelecimento: [''],
      numeroEstabelecimento: [''],
      bairroEstabelecimento: [''],
      descricao: [''],
    });
  }

  cadastrar() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    this.salvar();
  }


  cadastrarEstabelecimento() {
    this.submitted = true;
    if (this.formulario.invalid) {

      return;
    }
    this.salvarEstabelecimento();
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

  salvarEstabelecimento() {
    if (this.imagem && !this.uploadedFiles[0]) {
      this.salvarOuAtualizarEstabelecimento();
    } else {
      const foto: any = this.uploadedFiles[0];
      const formData: any = new FormData();
      formData.append('imagem', foto);
      this.repositoryEstabelecimento.postImagem(formData).subscribe(resposta => {
        this.imagem = resposta.id;
        this.salvarOuAtualizarEstabelecimento();
      })
    }
  }

  salvarOuAtualizar() {
    const dados = {
      id: this.formulario.value.id,
      razao: this.formulario.value.razao,
      cnpj: this.formulario.value.cnpj,
      telefone: this.formulario.value.telefone,
      email: this.formulario.value.email,
      senha: this.formulario.value.senha,
      confirmarsenha: this.formulario.value.confirmarsenha,
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
    } as ParceiroModel;

    if (dados.id) {
      this.repository.putParceiro(dados).subscribe(resposta => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'PARCEIRO',
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
            msg.push({
              severity: 'error',
              summary: 'ERRO',
              detail: elemento.userMessage
            });
          });

          this.messageService.addAll(msg);
        }
      );
    } else {
      this.repository.postParceiro(dados).subscribe(resposta => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'PARCEIRO',
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
            msg.push({
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

  salvarOuAtualizarEstabelecimento() {
    const codigo = this.service.jwtPayload.usuario_id;
    console.log(this.formulario.value.nomeEstabelecimento);
    const dados = {
      id: this.formulario.value.id,
      nome: this.formulario.value.nomeEstabelecimento,
      cnpj: this.formulario.value.cnpjEstabelecimento,
      descricao: this.formulario.value.descricao,
      tipoEstabelecimento: this.formulario.value.tipoEstabelecimento,
      telefone: this.formulario.value.telefoneEstabelecimento,
      parceiroGlace: {
        id: codigo
      },
      endereco: {
        cep: this.formulario.value.cepEstabelecimento,
        rua: this.formulario.value.ruaEstabelecimento,
        numero: this.formulario.value.numeroEstabelecimento,
        bairro: this.formulario.value.bairroEstabelecimento,
        cidade: {
          id: this.formulario.value.cidade
        }
      },
      foto: {
        id: this.imagem
      }
    } as EstabelecimentoModel;

    if (dados.id) {
      this.repositoryEstabelecimento.postEstabelecimento(dados).subscribe(resposta => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'ESTABELECIMENTO',
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
            msg.push({
              severity: 'error',
              summary: 'ERRO',
              detail: elemento.userMessage
            });
          });
          this.messageService.addAll(msg);
        }
      );
    } else {
      this.repositoryEstabelecimento.postEstabelecimento(dados).subscribe(resposta => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'ESTABELECIMENTO',
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
            msg.push({
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
}

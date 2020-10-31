import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ParceiroModel } from '../model/parceiro-model';
import { ParceiroRepository } from '../repository/parceiro-repository';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-perfil-parceiro',
  templateUrl: './perfil-parceiro.component.html',
  styleUrls: ['./perfil-parceiro.component.css']
})
export class PerfilParceiroComponent implements OnInit {

  @ViewChild('upload') upload: ElementRef;

  public formulario: FormGroup;

  public submitted: boolean = false;
  usuario: string = '';

  operacao: boolean = true;

  uploadedFiles: any[] = [];
  estados: any[] = [];
  cidades: any[] = [];
  mensagem: Message[] = [];

  constructor(
    public service: AuthService,
    private repository: ParceiroRepository,
    private fb: FormBuilder
  ) { this.usuario = service.jwtPayload ? service.jwtPayload.nome_completo : ''; }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      razao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarsenha: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  cadastrar() {
    console.log("aqui");
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }

    this.salvar();
  }

  atualizar() {
    this.submitted = true;
    if (this.formulario.dirty) {
      return;
    }
    this.salvar();
  }

  salvar() {
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
      }
    } as ParceiroModel;

    if (dados.id) {
      this.repository.putParceiro(dados).subscribe(resposta => {
        this.limparFormulario();
      });
    } else {
      this.repository.postParceiro(dados).subscribe(resposta => {
        this.mensagem = [
          {
            severity: 'success',
            summary: 'PARCEIRO',
            detail: 'cadastrado com sucesso!'
          }];
        this.limparFormulario();
      }, (e) => {
          var msg: any[] = [];
          //Erro Principal
          msg.push({
            severity: 'error',
            summary: 'ERRO',
            detail: e.error.userMessage
          });
          //Erro de cada atributo
          var erros = e.error.objects;
          erros.forEach(function (value) {
            msg.push(
              {
                severity: 'error',
                summary: 'ERRO',
                detail: value.userMessage
              });
          });
          this.mensagem = msg;
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

  enviarImagem(evento){
    this.uploadedFiles = [];

    for(let file of evento.files) {
      this.uploadedFiles.push(file);
    }

  }

}


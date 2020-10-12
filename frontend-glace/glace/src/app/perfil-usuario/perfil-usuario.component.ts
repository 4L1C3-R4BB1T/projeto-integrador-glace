import { ClienteModel } from './../cadastro-usuario/model/cliente-model';
import { ClienteRepository } from './../cadastro-usuario/repository/cliente-repository';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  estados: any[] = [];
  cidades: any[] = [];
  public submitted: boolean = false;

  mensagem: Message[] = [];

  operacao: boolean = true;

  public formulario: FormGroup;

  constructor(
    private repository: ClienteRepository,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      cpf: ['', Validators.required],
      telefone: [''],
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

  atualizar() {
    this.submitted = true;
    if (this.formulario.dirty) {
      return;
    }
    this.salvar();
  };
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
  
}

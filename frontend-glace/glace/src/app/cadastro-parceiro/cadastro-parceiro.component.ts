import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ParceiroModel } from './model/parceiro-model';
import { ParceiroRepository } from './repository/parceiro-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  estados: any[] = [];
  cidades: any[] = [];
  public submitted: boolean = false;

  mensagem: Message[] = [];

  operacao: boolean = true;

  public formulario: FormGroup;

  constructor(
    private repository: ParceiroRepository,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.repository.getAllEstados().subscribe(resposta => {
      this.estados.push({ label: resposta.nome, value: resposta.id });
    });
  }

  public iniciarFormulario() {

    this.formulario = this.fb.group({
      id: [null],
      razao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cnpj: ['', Validators.required],
      telefone: [''],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarsenha: ['', Validators.required],
      cep: [''],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  cadastrar() {
    if (this.formulario.invalid) {
      return;
    }
    this.salvar();
  };

  salvar() {
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
  }

}

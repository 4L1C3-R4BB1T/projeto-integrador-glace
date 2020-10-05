import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClienteModel } from './model/cliente-model';
import { ClienteRepository } from './repository/cliente-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  estados: any[] = [];
  cidades: any[] = [];
  public formulario: FormGroup;

  constructor(
    private repository: ClienteRepository,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.repository.getAllEstados().subscribe(resposta => {
      this.estados.push({ label: resposta.nome, value: resposta.id });
    });
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNasc: [''],
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
    if (this.formulario.invalid) {
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
        this.limparFormulario();
      });
    }

    console.log(this.formulario.value.dataNasc);
  }

  limparFormulario() {
    this.formulario.reset();
  }

  listarCidades() {
    this.cidades = [];
    let id: number = this.formulario.value.estado;

    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }

}

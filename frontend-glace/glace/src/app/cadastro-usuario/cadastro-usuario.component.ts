
import { ClienteModel } from '../cadastro-usuario/model/cliente-model';
import { ClienteRepository } from '../cadastro-usuario/repository/cliente-repository';
import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cidade } from './../pesquisa/cidade';
import { Estado } from './../pesquisa/estado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  // cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
  // telefone: '', endereco:'', senha: ''};

  estados: Estado[];
  cidades: Cidade[];

  estadoSelecionado: Estado;
  cidadeSelecionada: Cidade;

  public formulario: FormGroup;
  operacao: boolean = true;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private repository: ClienteRepository,
    private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.iniciarFormulario();

    this.repository.getAllEstados().subscribe(resposta =>{
    this.estados.push({ label: resposta.nome, value: resposta.id });
    });
  }

  public iniciarFormulario(){
    this.formulario= this.fb.group({
      id: [null],
      nome: ['',Validators.required, Validators.minLength(3)],
      sobrenome:['', Validators.required ] ,
      telefones:[''],
      dataNasc:[''],
      cpf: [''],
      senha:[''],
      email:[''],
      cep:[''],
      logradouro:[''],
      numero: [''],
      complemento: [''],
      bairro:[''],
      cidade:[''],
      estado:[''],
    });
  }
  cadastrar(){
    if (this.formulario.invalid){
      return;
    }
    this.salvar();
  };
salvar(){
  //const listaTelefones = [];
  //this.formulario.value.telefones.forEach(element =>{
    //listaTelefones.push({
      //id: null, numero:element, tipo: 'casa'
 // })
 // });

  const dados = {
    id: this.formulario.value.id,
    nome: this.formulario.value.nome,
    sobrenome: this.formulario.value.sobrenome,
    telefones:this.formulario.value.telefones,
    dataNasc: this.formulario.value.dataNasc,
    cpf: this.formulario.value.cpf,
    senha: this.formulario.value.senha,
    email: this.formulario.value.email,
    endereco:{
      cep: this.formulario.value.cep,
      logradouro: this.formulario.value.logradouro,
      numero: this.formulario.value.numero,
      complemento: this.formulario.value.complemento,
      bairro: this.formulario.value.bairro,
      cidade: {
        id: this.formulario.value.cidade
      }
    }
  }as ClienteModel;
  
  if (dados.id){
    this.repository.putCliente(dados).subscribe(resposta=> {
      this.limparFormulario();
    });
  }
  else{
    this.repository.postCliente(dados).subscribe(resposta =>{
      this.limparFormulario();
    })
  }
}
  limparFormulario(){
    this.formulario.reset();
  }
  // adicionar() {
  //   this.clienteService.adicionar(this.cliente).subscribe(() => {
  //     this.cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
  //     telefone: '', endereco:'', senha: ''};
  //     console.log("Dados inseridos com sucesso!");
  //   });
  // }
  
  // listarCidades(idEstado: number) {
  //   this.clienteService.listarCidades(idEstado).subscribe(resposta =>
  //     this.cidades = resposta as any);
  // }
  listarCidades(){
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta =>{
    this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }

}
// var senha = document.getElementById("senha");
// var confirmarSenha = document.getElementById("confirmarSenha");

// function validatePassword(): void{
//   if(senha.nodeValue != confirmarSenha.nodeValue) {
//     alert("Senhas diferentes!");
//   } 
// }

// senha.onchange = validatePassword;
// confirmarSenha.onkeyup = validatePassword;

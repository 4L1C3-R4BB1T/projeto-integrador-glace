import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cidade } from './../pesquisa/cidade';
import { Estado } from './../pesquisa/estado';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
  telefone: '', endereco:'', senha: ''};

  estados: Estado[];
  cidades: Cidade[];

  estadoSelecionado: Estado;
  cidadeSelecionada: Cidade;

  constructor(private clienteService: ClienteService, private router: Router) {
  }
  ngOnInit(): void {
     
  }
  
  adicionar() {
    this.clienteService.adicionar(this.cliente).subscribe(() => {
      this.cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
      telefone: '', endereco:'', senha: ''};
      console.log("Dados inseridos com sucesso!");
    });
  }
  
  listarCidades(idEstado: number) {
    this.clienteService.listarCidades(idEstado).subscribe(resposta =>
      this.cidades = resposta as any);
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

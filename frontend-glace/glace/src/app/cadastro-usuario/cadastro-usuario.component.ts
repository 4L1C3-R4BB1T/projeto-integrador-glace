import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
  telefone: '', endereco:'', senha: ''};

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

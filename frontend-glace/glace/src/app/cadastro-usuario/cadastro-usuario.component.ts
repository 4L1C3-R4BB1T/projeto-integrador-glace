import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
  telefone: '', endereco:'', senha: '', confirmarSenha: '' };

  constructor(private usuarioService: UsuarioService, private router: Router) {
  }
  ngOnInit() {
     
  }
  
  adicionar() {
    this.usuarioService.adicionar(this.cliente).subscribe(() => {
      this.cliente = {id: '', nome: '', sobrenome: '', dataNasc: '', cpf: '', email: '',
      telefone: '', endereco:'', senha: '', confirmarSenha: ''};
      console.log("Dados inseridos com sucesso!");
    });
  }
  
}
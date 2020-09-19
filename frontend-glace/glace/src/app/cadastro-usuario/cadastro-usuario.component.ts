import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario = {id: '', nome: '', telefone: '', cpf: '', dataAberturaConta: '', endereco: '',
  numeroConta: '' };

  constructor(/*private clienteService: UsuarioService*/) {
  }
  ngOnInit() {
    // this.consultar();
  }
  /*
  consultar() {
    this.clienteService.listar().subscribe(resposta =>
      this.usuario = {id: '', nome: '', telefone: '', cpf: '', dataAberturaConta: '', endereco: '',
      numeroConta: '' });
      console.log('Dados inseridos com sucesso');
  }
  */
}
import { EstabelecimentoModel } from './../model/estabelecimento-model';
import { EstabelecimentoRepository } from './../repository/estabelecimento-repository';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-estabelecimento-list',
  templateUrl: './estabelecimento-list.component.html',
  styleUrls: ['./estabelecimento-list.component.css']
})
export class EstabelecimentoListComponent implements OnInit {


  clientes: EstabelecimentoModel[] = [];
  loading: boolean;
  usuario: string = '';
  @ViewChild('dt') table: Table;
  
  constructor(
    public service: AuthService,
    private repository: EstabelecimentoRepository,
    private confirmarService: ConfirmationService,
    private messageService: MessageService,
    private title: Title) { }

  ngOnInit() {    
    this.loading = true;
    this.carregarEstabelecimento();  
  }  
  
  carregarEstabelecimento(){
    //Pegado id do parceiro por meio do token
    const codigo = this.service.jwtPayload.usuario_id;
    this.title.setTitle('Lista de Estabelecimentos');
    this.clientes = [];
    this.repository.getAllEstabelecimentosParceiros(codigo).then(resposta => {
      this.clientes = resposta;
      this.loading = false;         
    });  
  }

  excluir(id: number){
    this.confirmarService.confirm({
      message: 'Tem certeza que deseja excluir este Estabelecimento?',
      accept: () => {
        this.repository.deleteEstabelecimento(id).subscribe( resposta => {
          this.messageService.add(
            
            {
              key: 'toast',
              severity: 'success',
              summary: 'ESTABELECIMENTO',
              detail: 'excluído com sucesso!'
            });   
            
            this.carregarEstabelecimento();
        });    
      }
    });
  }
 
}


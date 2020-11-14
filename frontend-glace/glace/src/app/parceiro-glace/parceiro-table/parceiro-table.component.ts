import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';

import { ParceiroRepository } from './../../parceiro-glace/repository/parceiro-repository';
import { ParceiroModel } from './../../parceiro-glace/model/parceiro-model';

@Component({
  selector: 'app-parceiro-table',
  templateUrl: './parceiro-table.component.html',
  styleUrls: ['./parceiro-table.component.css']
})
export class ParceiroTableComponent implements OnInit {

  parceiros: ParceiroModel[]=[];
  loading: boolean;
  @ViewChild('dt') table2: Table;

  constructor(
    private confirmarService: ConfirmationService,
    private messageService: MessageService,
    private parcRepository: ParceiroRepository,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.carregarParceiros();
  }

  carregarParceiros(){
    this.title.setTitle('Lista de Parceiro');
    this.parceiros = [];
    this.parcRepository.getAllParceiro().then(resposta => {
      this.parceiros = resposta;
      this.loading = false;         
    });  
  }

  excluirParc(id: number){ 
    this.confirmarService.confirm({
      message: 'Tem certeza que deseja excluir este parceiro?',
      accept: () => {
        this.parcRepository.deleteParceiro(id).subscribe( resposta => {
          this.messageService.add(
            {
              key: 'toast',
              severity: 'success',
              summary: 'PARCEIRO',
              detail: 'excluído com sucesso!'
            });   
            this.carregarParceiros();
        });    
      }
    });
  }

}

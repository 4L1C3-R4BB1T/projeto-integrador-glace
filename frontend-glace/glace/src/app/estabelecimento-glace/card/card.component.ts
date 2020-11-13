import { Component, OnInit } from '@angular/core';
import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { EstabelecimentoRepository } from '../repository/estabelecimento-repository';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private repository: EstabelecimentoRepository) { }

  meusCards: EstabelecimentoModel[] = [];

  ngOnInit(): void {
    this.repository.getAllEstabelecimentos().subscribe(resposta => {
      this.meusCards.push({
        id: resposta.id,
        nome: resposta.nome,
        descricao: resposta.descricao,
        cnpj: resposta.cnpj,
        //acessibilidades: resposta.acessibilidades,
        endereco: resposta.endereco,
        tipoEstabelecimento: resposta.tipoEstabelecimento,
        foto: resposta.foto,
      });
    });

    console.log(this.meusCards);
  }
}

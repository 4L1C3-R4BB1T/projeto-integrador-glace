import { Component, OnInit, Input } from '@angular/core';
import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { EstabelecimentoRepository } from '../repository/estabelecimento-repository';

@Component({
  selector: 'app-card-pesquisa',
  templateUrl: './card-pesquisa.component.html',
  styleUrls: ['./card-pesquisa.component.css']
})
export class CardPesquisaComponent implements OnInit {

  constructor(private repository: EstabelecimentoRepository) { }

  @Input() meusCards: EstabelecimentoModel[];

  ngOnInit(): void {
    
  }
}

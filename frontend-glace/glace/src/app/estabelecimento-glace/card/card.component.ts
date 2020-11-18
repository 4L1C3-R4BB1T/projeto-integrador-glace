import { Component, Input, OnInit } from '@angular/core';
import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { EstabelecimentoRepository } from '../repository/estabelecimento-repository';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  constructor(private repository: EstabelecimentoRepository) { }

  @Input() meusCards: EstabelecimentoModel[];

  ngOnInit(): void {
    
  }
}

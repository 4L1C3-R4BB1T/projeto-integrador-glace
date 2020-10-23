import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/http/card.service';
import { Card } from '../card/card.model'

@Component({
  selector: 'app-card-pesquisa',
  templateUrl: './card-pesquisa.component.html',
  styleUrls: ['./card-pesquisa.component.css']
})
export class CardPesquisaComponent implements OnInit {

  constructor(private cardService: CardService) { }

  meusCards: Card[] = [];

  ngOnInit(): void {
    this.cardService.getCards().then(c => {
      this.meusCards = c;
    })
  }

}

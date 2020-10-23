import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/http/card.service';
import { Card } from './card.model'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService) { }

  meusCards: Card[] = [];

  ngOnInit(): void {
    this.cardService.getCards().then(c => {
      this.meusCards = c;
    })
  }

}

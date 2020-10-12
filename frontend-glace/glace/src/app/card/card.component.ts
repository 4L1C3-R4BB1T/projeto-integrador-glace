import { CardService } from '../card.service';
import { Component, OnInit } from '@angular/core';
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

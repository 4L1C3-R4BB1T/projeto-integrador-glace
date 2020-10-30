import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../../../estabelecimento-glace/card/card.model'

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor(private HttpClient: HttpClient) { }

  getCards() {
    return this.HttpClient.get<any>('assets/db.json')
    .toPromise()
    .then(res => <Card[]>res.data)
    .then(data => { return data; });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstabelecimentoModel } from 'src/app/estabelecimento-glace/model/estabelecimento-model';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  apiUrl = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  listar(){
    return this.httpClient.get(this.apiUrl + '/estabelecimento');
  }

  listarEstados(){
    return this.httpClient.get(this.apiUrl+ '/estado');
  }

  listarCidades(idEstado){
    return this.httpClient.get(this.apiUrl+ '/cidade/'+idEstado);
  }

  adicionar(estabelecimento: any) {
    return this.httpClient.post(this.apiUrl, estabelecimento);
  }

  excluir(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  atualizar(estabelecimento: any) {
    return this.httpClient.put(this.apiUrl+ '/' + estabelecimento.id, estabelecimento);
  }
}

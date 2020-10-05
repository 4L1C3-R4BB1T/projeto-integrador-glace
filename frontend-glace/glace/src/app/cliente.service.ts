import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  URLSERVIDOR = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { 
  
  }

  listar(){
    return this.httpClient.get(this.URLSERVIDOR);
  }

  listarEstados(){
    return this.httpClient.get(this.URLSERVIDOR+ '/estado');
  }

  listarCidades(idEstado){
    return this.httpClient.get(this.URLSERVIDOR+ '/cidade/'+idEstado);
  }

  adicionar(cliente: any) {
    return this.httpClient.post(this.URLSERVIDOR, cliente);
  }

  excluir(id: number) {
    return this.httpClient.delete(this.URLSERVIDOR + '/' + id);
  }
  
  atualizar(cliente: any) {
    return this.httpClient.put(this.URLSERVIDOR+ '/' + cliente.id, cliente);
  }
}
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl = "http://localhost:8080/cliente"

  constructor(private httpClient: HttpClient) { 
  
  }

  listar(){
    return this.httpClient.get(this.apiUrl);
  }
  adicionar(cliente: any) {
    return this.httpClient.post(this.apiUrl, cliente);
  }
  excluir(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }
  atualizar(cliente: any) {
    return this.httpClient.put(this.apiUrl+ '/' + cliente.id, cliente);
  }
}
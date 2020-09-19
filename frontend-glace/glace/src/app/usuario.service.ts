import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = "http://localhost:8080/usuario"

  constructor(private httpClient: HttpClient) { 
  
  }

  listar(){
    return this.httpClient.get(this.apiUrl);
  }

  adicionar(usuario: any) {
    return this.httpClient.post(this.apiUrl, usuario);
  }

  excluir(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  atualizar(usuario: any) {
    return this.httpClient.put(this.apiUrl+ '/' + usuario.id, usuario);
  }
}

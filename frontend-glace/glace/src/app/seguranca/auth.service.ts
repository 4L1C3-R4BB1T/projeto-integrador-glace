import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthRepository } from './auth-repository';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtPayload: any; 

  constructor(public repository: AuthRepository, private router: Router) { 
    this.carregarToken();
  }

  login(login: string, senha: string){
    
    return this.repository.postLogin(login, senha).subscribe(resposta => {
        
        const json: JSON = JSON.parse(JSON.stringify(resposta));
        console.log(json);
        this.armazenarToken(json['access_token']);
        
        console.log('Novo access token criado!'+JSON.stringify(this.jwtPayload));
        this.router.navigate(['/cliente']);
        console.log
      },
        (e) => {
          console.log(e.error.error_description);      
        });    
  }

  private armazenarToken(token: string) {
    this.jwtPayload = JSON.parse(atob(token.split('.')[1]));
    
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  logout() {
    return this.repository.postLogout().subscribe(resposta => {
        this.limparAccessToken();
        this.router.navigate(['/login']);
      },
      (e) => {
        console.log(e.error.error_description);      
      }); 
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    
    return !token || this.isTokenExpired();
  }

  isTokenExpired(){
    this.repository.postCheckToken().subscribe(resposta => {        
      const json: JSON = JSON.parse(JSON.stringify(resposta));      
      if(json['active']){
        return false;
      }    
    },
    ( e ) => {
        this.obterNovoAccessToken();           
    });
  }

  obterNovoAccessToken(){    
    return this.repository.postRefreshToken().subscribe(resposta => {
      const json: JSON = JSON.parse(JSON.stringify(resposta));
      this.armazenarToken(json['access_token']);
      console.log('Novo access token criado pelo refresh token! '+JSON.stringify(this.jwtPayload));
      },
      (e) => {
        console.log(e.error.error_description);  
        this.router.navigate(['/login']);    
      });  
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

}

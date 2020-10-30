import { HttpService } from './../services/http/http.services';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../services/http/base-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthRepository {

  constructor(private http: HttpClient) { }

  postLogin(usuario: string, senha: string): Observable<Object>{
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ZnJvbnRlbmRHbGFjZS1jbGllbnQ6cHJvamV0b2dsYWNl'
    });

    return this.http
    .post(`${environment.URLSERVIDOR}oauth/token`, body, { headers, withCredentials: true });

  }

  postRefreshToken(): Observable<Object> {
    const body = 'grant_type=refresh_token';
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ZnJvbnRlbmRHbGFjZS1jbGllbnQ6cHJvamV0b2dsYWNl'
    });

    return this.http
    .post(`${environment.URLSERVIDOR}oauth/token`, body, { headers, withCredentials: true });
  }

  postCheckToken(): Observable<Object> {
    const body = `token=${localStorage.getItem("token")}`;
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });

    return this.http
    .post(`${environment.URLSERVIDOR}oauth/check_token`, body, { headers });
  }

  postLogout(): Observable<Object> {
    return this.http
    .delete(`${environment.URLSERVIDOR}token/revoke`);
  }

}

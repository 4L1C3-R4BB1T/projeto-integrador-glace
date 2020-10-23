import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../services/http/base-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthRepository {

    constructor(public http: BaseHttpService) { }
    
    post(usuario: string, senha: string) {
        const body = `username=${usuario}&password=${senha}&grant_type=password`;
        const headers = new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':'Basic ZnJvbnRlbmRHbGFjZS1jbGllbnQ6cHJvamV0b2dsYWNl' });
        
         return this.http
            .post(`${environment.URLSERVIDOR}oauth/token`, body, false, false, headers);
    }

    postRefreshToken() {
        const body = 'grant_type=refresh_token';
        return this.http
            .post(`${environment.URLSERVIDOR}oauth/token`, body);
    }

    postLogout() {
        const body = `username=7700546534&password=L3&grant_type=password`;
        const headers = new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Basic TDM6cHJvdmU=' });
        return this.http
            .post(`${environment.URLSERVIDOR}oauth/token`, body, false, false, headers);
    }
    
}

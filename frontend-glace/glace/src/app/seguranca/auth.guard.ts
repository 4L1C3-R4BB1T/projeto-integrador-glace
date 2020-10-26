import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()

export class AuthGuard implements CanActivate {

 
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.auth.isAccessTokenInvalido()) {
        if (this.auth.isAccessTokenInvalido()) {
            this.router.navigate(['/login']);
            return false;
        }  
      } 
      if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)) {
          this.router.navigate(['/nao-autorizado']);
          return false;
      }

      return true;
  }

} 
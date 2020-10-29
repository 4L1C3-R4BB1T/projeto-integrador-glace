import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-nav-bar-secundaria',
  templateUrl: './nav-bar-secundaria.component.html',
  styleUrls: ['./nav-bar-secundaria.component.css']
})
export class NavBarSecundariaComponent implements OnInit {

  constructor(public service: AuthService) { 
  }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();      
  }

}

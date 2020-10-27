import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public service: AuthService) { 
  }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();      
  }

}

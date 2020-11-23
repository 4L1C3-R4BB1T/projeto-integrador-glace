import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'glace';

  constructor(private router: Router){ }

  get exibirNavBar(){
    return this.router.url !=='/pesquisa';
  }

}

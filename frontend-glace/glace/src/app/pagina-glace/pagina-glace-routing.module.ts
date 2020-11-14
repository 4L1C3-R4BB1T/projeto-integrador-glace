import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'quem-somos', component: QuemSomosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaGlaceRoutingModule { }

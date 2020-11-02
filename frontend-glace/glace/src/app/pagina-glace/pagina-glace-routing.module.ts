import { DetalhesLocalComponent } from './../estabelecimento-glace/detalhes-local/detalhes-local.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CardComponent } from './../estabelecimento-glace/card/card.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'card', component: CardComponent},
  {path: 'quemSomos', component: QuemSomosComponent},
  {path: 'detalhesLocal', component: DetalhesLocalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaGlaceRoutingModule { }

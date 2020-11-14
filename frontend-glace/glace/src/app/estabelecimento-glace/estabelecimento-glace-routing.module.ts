import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesLocalComponent } from './detalhes-local/detalhes-local.component';

const routes: Routes = [
    { path: 'detalhes/local', component: DetalhesLocalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentoGlaceRoutingModule { }

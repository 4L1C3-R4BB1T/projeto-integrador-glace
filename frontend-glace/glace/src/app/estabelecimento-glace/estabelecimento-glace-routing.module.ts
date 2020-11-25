import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroLocalComponent } from './cadastro-local/cadastro-local.component';
import { DetalhesLocalComponent } from './detalhes-local/detalhes-local.component';

const routes: Routes = [
  { path: 'detalhes/local/:codigo', component: DetalhesLocalComponent },
  { path: 'estabelecimento/:codigo', component: CadastroLocalComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentoGlaceRoutingModule { }

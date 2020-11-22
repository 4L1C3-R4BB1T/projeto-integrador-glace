import { ParceiroTableComponent } from './parceiro-table/parceiro-table.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstabelecimentoListComponent } from '../estabelecimento-glace/estabelecimento-list/estabelecimento-list.component';

const routes: Routes = [
  { path: 'perfil/parceiro/:codigo', component: PerfilParceiroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PG', 'UG'] }
  },
  { path: 'perfil/parceiro', component: PerfilParceiroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PG', 'UG'] }
  },
  {
    path: 'listar/parceiro', component: ParceiroTableComponent,
    canActivate: [AuthGuard],
    data: { roles: ['UG'] }
  },
  { path: 'cadastro/parceiro', component: CadastroParceiroComponent },
  { path: 'listarParceiros', component: EstabelecimentoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParceiroGlaceRoutingModule { }

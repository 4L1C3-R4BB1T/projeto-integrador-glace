import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'perfilParceiro/:codigo', component: PerfilParceiroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PG'] }
  },
  { path: 'perfilParceiro', component: PerfilParceiroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PG'] }
  },
  {path: 'cadastroParceiro', component: CadastroParceiroComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParceiroGlaceRoutingModule { }

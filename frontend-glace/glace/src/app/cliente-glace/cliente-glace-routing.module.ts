import { CadastroParceiroComponent } from './../parceiro-glace/cadastro-parceiro/cadastro-parceiro.component';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CadastroUsuarioComponent } from '../cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'cliente', component: CadastroUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] } 
  },
  { path: 'perfilCliente', component: PerfilUsuarioComponent,
  canActivate: [AuthGuard],
  data: { roles: ['CG'] } 
},
{ path: 'perfilParceiro', component: PerfilParceiroComponent,
canActivate: [AuthGuard],
data: { roles: ['PG'] } 
},
{ path: 'parceiro', component: CadastroParceiroComponent,
canActivate: [AuthGuard],
data: { roles: ['PG'] } 
},
{ path: 'cliente/:codigo', component: CadastroUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteGlaceRoutingModule { }

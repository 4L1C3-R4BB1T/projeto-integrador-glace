import { ClienteTableComponent } from './cliente-table/cliente-table.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from '../cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { PerfilUsuarioComponent } from '../cliente-glace/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {
    path: 'perfil/usuario/:codigo', component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG', 'UG'] }
  },
  {
    path: 'perfil/usuario', component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG', 'UG'] }
  },
  {
    path: 'listar/cliente', component: ClienteTableComponent,
    canActivate: [AuthGuard],
    data: { roles: ['UG'] }
  },
  { path: 'cadastro/usuario', component: CadastroUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteGlaceRoutingModule { }

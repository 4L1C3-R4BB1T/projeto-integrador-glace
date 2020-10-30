import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from '../cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { PerfilUsuarioComponent } from '../cliente-glace/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {
    path: 'cliente', component: CadastroUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
  {
    path: 'perfilUsuario/:codigo', component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteGlaceRoutingModule { }
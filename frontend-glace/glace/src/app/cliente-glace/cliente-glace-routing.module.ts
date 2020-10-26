import { CadastroUsuarioComponent } from '../cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'cliente', component: CadastroUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteGlaceRoutingModule { }

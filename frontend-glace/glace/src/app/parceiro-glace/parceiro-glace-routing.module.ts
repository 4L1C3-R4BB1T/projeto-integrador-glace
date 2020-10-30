import { CadastroParceiroComponent } from './../parceiro-glace/cadastro-parceiro/cadastro-parceiro.component';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from '../cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { PerfilUsuarioComponent } from '../cliente-glace/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
 
{ path: 'perfilParceiro/:codigo', component: PerfilParceiroComponent,
canActivate: [AuthGuard],
data: { roles: ['PG'] } 
},
{ path: 'cadastroParceiro', component: CadastroParceiroComponent,
canActivate: [AuthGuard],
data: { roles: ['PG'] } 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParceiroGlaceRoutingModule { }
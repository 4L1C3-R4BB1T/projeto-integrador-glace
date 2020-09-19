
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { LoginComponent } from './login/login.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';



const routes: Routes = [
  {path: 'cadastroUsuario',component: CadastroUsuarioComponent},
  {path: 'quemSomos',component: QuemSomosComponent},
  {path: 'pesquisa',component: PesquisaComponent },
  {path: 'login',component: LoginComponent},
  {path: 'perfilAdmin',component: PerfilAdminComponent},
  {path: 'home',component: HomeComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

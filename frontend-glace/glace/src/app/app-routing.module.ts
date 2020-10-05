import { CadastroLocalComponent } from './cadastro-local/cadastro-local.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { DetalhesLocalComponent } from './detalhes-local/detalhes-local.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';

const routes: Routes = [
  {path: 'quemSomos', component: QuemSomosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'cadastroUsuario', component: CadastroUsuarioComponent},
  {path: 'perfilUsuario', component: PerfilUsuarioComponent},
  {path: 'perfilAdmin', component: PerfilAdminComponent},
  {path: 'detalhesLocal', component: DetalhesLocalComponent},
  {path: 'cadastroLocal', component: CadastroLocalComponent},
  {path: '', pathMatch: 'full', redirectTo:'/home'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

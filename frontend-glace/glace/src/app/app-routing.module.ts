import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { CadastroParceiroComponent } from './parceiro-glace/cadastro-parceiro/cadastro-parceiro.component';
import { CadastroLocalComponent } from './estabelecimento-glace/cadastro-local/cadastro-local.component';
import { PerfilParceiroComponent } from './parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { DetalhesLocalComponent } from './estabelecimento-glace/detalhes-local/detalhes-local.component';
import { CadastroUsuarioComponent } from './cliente-glace/cadastro-usuario/cadastro-usuario.component';
import { PesquisaComponent } from './pagina-glace/pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pagina-glace/home/home.component';

import { QuemSomosComponent } from './pagina-glace/quem-somos/quem-somos.component';

const routes: Routes = [
  {path: 'quemSomos', component: QuemSomosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'cadastroUsuario', component: CadastroUsuarioComponent},
  {path: 'detalhesLocal', component: DetalhesLocalComponent},
  {path: 'cadastroLocal', component: CadastroLocalComponent},
  {path: 'cadastroParceiro', component: CadastroParceiroComponent},
  {path: '', pathMatch: 'full', redirectTo:'/home'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { PerfilUsuarioComponent } from './cliente-glace/perfil-usuario/perfil-usuario.component';
import { AuthGuard } from './seguranca/auth.guard';
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
  { path: 'pesquisa', component: PesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
  {path: 'quemSomos', component: QuemSomosComponent },
  {path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
  {path: 'perfilUsuario', component: PerfilUsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['UG', 'CG'] }
  },
  {path: 'perfilParceiro', component: PerfilParceiroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['PG'] }
  },
  {path: 'detalhesLocal', component: DetalhesLocalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
  {path: 'cadastroLocal', component: CadastroLocalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['CG'] }
  },
  {path: 'login', component: LoginFormComponent},
<<<<<<< HEAD
  {path: 'pesquisa', component: PesquisaComponent},
  {path: 'cadastroUsuario', component: CadastroUsuarioComponent},
  {path: 'detalhesLocal', component: DetalhesLocalComponent},
  {path: 'cadastroLocal', component: CadastroLocalComponent},
=======
  { path: 'cadastroUsuario', component: CadastroUsuarioComponent},
>>>>>>> 6e2132862e58634f2f94d488a75add0ae48da978
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

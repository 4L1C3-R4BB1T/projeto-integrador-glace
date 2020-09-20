import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetalhesLocalComponent } from './detalhes-local/detalhes-local.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PesquisaComponent,
    QuemSomosComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PerfilAdminComponent,
    PerfilUsuarioComponent,
    DetalhesLocalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

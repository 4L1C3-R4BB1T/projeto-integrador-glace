import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
=======
import { PerfilAdminComponent } from './perfil_admin/perfil-admin/perfil-admin.component';
>>>>>>> 8d48e9ff96f9050e50136898eba31e6ec5e86316

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PesquisaComponent,
    QuemSomosComponent,
    LoginComponent,
<<<<<<< HEAD
    CadastroUsuarioComponent
=======
    PerfilAdminComponent
>>>>>>> 8d48e9ff96f9050e50136898eba31e6ec5e86316
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { LoginComponent } from './login/login.component';
import { PerfilAdminComponent } from './perfil_admin/perfil-admin/perfil-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PesquisaComponent,
    QuemSomosComponent,
    LoginComponent,
    PerfilAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

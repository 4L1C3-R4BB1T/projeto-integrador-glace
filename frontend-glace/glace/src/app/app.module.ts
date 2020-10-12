import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';

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
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavBarSecundariaComponent } from './nav-bar-secundaria/nav-bar-secundaria.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DropdownModule } from 'primeng/dropdown';
import { CadastroLocalComponent } from './cadastro-local/cadastro-local.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {FileUploadModule} from 'primeng/fileupload';

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
    DetalhesLocalComponent,
    FooterComponent,
    NavBarSecundariaComponent,
    NavBarComponent,
    CadastroLocalComponent,
    CadastroParceiroComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    InputMaskModule,
    NgxMaskModule.forRoot(),
    FileUploadModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }

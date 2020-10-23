import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MessageService } from 'primeng/api';
import { AuthService } from './seguranca/auth.service';
import { SegurancaModule } from './seguranca/seguranca.module';
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
import { LoginFormComponent } from '../app/seguranca/login-form/login-form.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PerfilParceiroComponent } from './perfil-parceiro/perfil-parceiro.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DetalhesLocalComponent } from './detalhes-local/detalhes-local.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavBarSecundariaComponent } from '../app/nav-bar-secundaria/nav-bar-secundaria.component';
import { DropdownModule } from 'primeng/dropdown';
import { CadastroLocalComponent } from './cadastro-local/cadastro-local.component';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CardComponent } from "./card/card.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CardPesquisaComponent } from './card-pesquisa/card-pesquisa.component';
import { NavigationStart } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PesquisaComponent,
    QuemSomosComponent,
    CadastroUsuarioComponent,
    PerfilParceiroComponent,
    PerfilUsuarioComponent,
    DetalhesLocalComponent,
    FooterComponent,
    CadastroLocalComponent,
    CadastroParceiroComponent,
    CardComponent,
    CardPesquisaComponent,
    NavBarSecundariaComponent,
    LoginFormComponent,
    NavBarComponent
    
        

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
    FileUploadModule,
    SegurancaModule,
    BrowserModule,
    AppRoutingModule

  ],
  providers: [
    AuthService,
    MessageService 
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

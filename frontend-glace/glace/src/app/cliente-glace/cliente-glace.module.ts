import { FileUploadModule } from 'primeng/fileupload';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './../app-routing.module';
import { LoginFormComponent } from './../seguranca/login-form/login-form.component';
import { NavBarSecundariaComponent } from './../template/nav-bar-secundaria/nav-bar-secundaria.component';
import { CardPesquisaComponent } from './../estabelecimento-glace/card-pesquisa/card-pesquisa.component';
import { FooterComponent } from './../template/footer/footer.component';
import { DetalhesLocalComponent } from './../estabelecimento-glace/detalhes-local/detalhes-local.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { QuemSomosComponent } from './../pagina-glace/quem-somos/quem-somos.component';
import { PesquisaComponent } from './../pagina-glace/pesquisa/pesquisa.component';
import { HomeComponent } from './../pagina-glace/home/home.component';
import { AppComponent } from './../app.component';
import { NavBarComponent } from '../template/nav-bar/nav-bar.component';
import { MessageService } from 'primeng/api';
import { AuthService } from '../seguranca/auth.service';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';
import { TemplateModule } from '../template/template.module';


import { ClienteGlaceRoutingModule } from './cliente-glace-routing.module';

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    PerfilUsuarioComponent,
  ],
  exports:[
    CadastroUsuarioComponent,
    PerfilUsuarioComponent,
  ],
  imports: [
    ClienteGlaceRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputMaskModule,
    FileUploadModule,
    TemplateModule,
   
  ],
  providers: [
  ],
})
export class ClienteGlaceModule { }

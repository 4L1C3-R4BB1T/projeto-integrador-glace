import { FileUploadModule } from 'primeng/fileupload';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './../app-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
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
    InputMaskModule,
    InputTextModule,
    TableModule,
    PanelModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    InputMaskModule,
    NgxMaskModule.forRoot(),
    FileUploadModule,
    SegurancaModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    TemplateModule,
   
  ],
  providers: [
  ],
})
export class ClienteGlaceModule { }

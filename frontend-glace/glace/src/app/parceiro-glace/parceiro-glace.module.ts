import { FileUploadModule } from 'primeng/fileupload';
import { NgxMaskModule } from 'ngx-mask';
import { DropdownModule } from 'primeng/dropdown';
import { AppRoutingModule } from './../app-routing.module';
import { PerfilParceiroComponent } from './../parceiro-glace/perfil-parceiro/perfil-parceiro.component';
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


import { ParceiroGlaceRoutingModule } from './parceiro-glace-routing.module';
import { CadastroParceiroComponent } from './cadastro-parceiro/cadastro-parceiro.component';
import { ParceiroTableComponent } from './parceiro-table/parceiro-table.component';

@NgModule({
  declarations: [
    PerfilParceiroComponent,
    CadastroParceiroComponent,
    ParceiroTableComponent,
  ],
  exports:[
    PerfilParceiroComponent,
    CadastroParceiroComponent,
  ],
  imports: [
    ParceiroGlaceRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputMaskModule,
    FileUploadModule,
    TemplateModule,
    NgxMaskModule.forRoot(),
    InputTextModule,
    TableModule,
    PanelModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    SegurancaModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
})
export class ParceiroGlaceModule { }

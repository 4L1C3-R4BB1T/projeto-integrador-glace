import { EstabelecimentoGlaceRoutingModule } from './estabelecimento-glace-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabelecimentoListComponent } from './estabelecimento-list/estabelecimento-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { TemplateModule } from '../template/template.module';
import { NgxMaskModule } from 'ngx-mask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [EstabelecimentoListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EstabelecimentoGlaceRoutingModule,
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
    MessageModule,
    SegurancaModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule,
  ],
  providers:[]
})
export class EstabelecimentoGlaceModule { }

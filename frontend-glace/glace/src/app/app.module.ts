import { PaginaGlaceModule } from './pagina-glace/pagina-glace.module';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SegurancaModule } from './seguranca/seguranca.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PesquisaComponent } from './pagina-glace/pesquisa/pesquisa.component';
import { QuemSomosComponent } from './pagina-glace/quem-somos/quem-somos.component';
import { LoginFormComponent } from '../app/seguranca/login-form/login-form.component';
import { DetalhesLocalComponent } from './estabelecimento-glace/detalhes-local/detalhes-local.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CadastroLocalComponent } from './estabelecimento-glace/cadastro-local/cadastro-local.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CardComponent } from "./estabelecimento-glace/card/card.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CardPesquisaComponent } from './estabelecimento-glace/card-pesquisa/card-pesquisa.component';
import { ClienteGlaceModule } from './cliente-glace/cliente-glace.module';
import { ParceiroGlaceModule } from './parceiro-glace/parceiro-glace.module';
import { TemplateModule } from './template/template.module';
import { EstabelecimentoGlaceModule } from './estabelecimento-glace/estabelecimento-glace.module';

@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent,
    QuemSomosComponent,
    DetalhesLocalComponent,
    CadastroLocalComponent,
    CardComponent,
    CardPesquisaComponent,
    LoginFormComponent
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
    AppRoutingModule,
    ToastModule,
    ClienteGlaceModule,
    ParceiroGlaceModule,
    TemplateModule,
    PaginaGlaceModule,
    ConfirmDialogModule,
    EstabelecimentoGlaceModule
  ],
  providers: [
    MessageService,
    Title,
    ConfirmationService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

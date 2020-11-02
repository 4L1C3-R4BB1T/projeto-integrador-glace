import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaRoutingModule
  ],
  providers:[
    AuthGuard,
    LoginFormComponent
  ]
})
export class SegurancaModule { }

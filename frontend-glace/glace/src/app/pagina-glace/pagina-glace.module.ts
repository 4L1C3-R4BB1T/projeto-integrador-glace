import { PaginaGlaceRoutingModule } from './pagina-glace-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginaGlaceRoutingModule
  ],
  providers:[]
})
export class PaginaGlaceModule { }

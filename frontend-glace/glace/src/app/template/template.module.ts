import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarSecundariaComponent } from './nav-bar-secundaria/nav-bar-secundaria.component';

@NgModule({
  declarations: [NavBarComponent, NavBarSecundariaComponent, FooterComponent],
  exports: [
    NavBarComponent,
    NavBarSecundariaComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }

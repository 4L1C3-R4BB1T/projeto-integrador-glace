import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }

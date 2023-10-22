import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class MaterialUiModule { }

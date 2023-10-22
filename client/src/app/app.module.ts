import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialUiModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

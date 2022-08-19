import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DeuxParDeuxComponent } from './deux-par-deux/deux-par-deux.component';

@NgModule({
  declarations: [
    AppComponent,
    DeuxParDeuxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

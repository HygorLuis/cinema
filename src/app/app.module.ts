import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Sala1Component } from './components/salas/sala1/sala1.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IngressosComponent } from './components/ingressos/ingressos.component';
import { FilmesComponent } from './components/filmes/filmes.component';

@NgModule({
  declarations: [
    AppComponent,
    Sala1Component,
    IngressosComponent,
    FilmesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { OperatorPageComponent } from './components/operator-page/operator-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformacionComponent,
    ServiciosComponent,
    AdminPageComponent,
    OperatorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

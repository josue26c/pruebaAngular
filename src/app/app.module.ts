import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarPersonaComponent } from './componentes/agregar-persona/agregar-persona.component';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { ListarPersonaComponent } from './componentes/listar-persona/listar-persona.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AgregarPersonaComponent,
    EditarPersonaComponent,
    ListarPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

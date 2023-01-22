import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';
import { PersonaService } from 'src/app/servicio/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent {
  ID:any;
  formularioPersonas:FormGroup;

  constructor(
    private activatedRoute:ActivatedRoute,
    private personaService:PersonaService,
    public formulario:FormBuilder, 
    private ruteador:Router
  ) {
      //Recupero ID de la URL
      this.ID=this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.ID);
      //Envio ID a la API REST para obtener los datos
      this.personaService.ObtenerPersona(this.ID).subscribe(
          respuesta=>{
          console.log(respuesta);
          //Agrega los valores a los campos del formulario
          this.formularioPersonas.setValue({
            Id:respuesta['id'],
            Nombre:respuesta['nombre'],
            Edad:respuesta['edad'],
            Apellido:respuesta['apellido']            
          });
        }
      );
      //Inicializa el formulario
      this.formularioPersonas=this.formulario.group({
        Id:this.ID,
        Nombre:[''],
        Edad:[''],
        Apellido:['']   
      });
   }

   enviarDatos():any{
    console.log(this.ID);
    console.log(this.formularioPersonas.value);
    this.personaService.EditarPersona(this.ID,this.formularioPersonas.value).subscribe(()=>{
    this.ruteador.navigateByUrl('/listar-persona');
    });
  }
}

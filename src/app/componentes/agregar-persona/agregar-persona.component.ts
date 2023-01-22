import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { PersonaService } from 'src/app/servicio/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit{
  formularioPersonas:FormGroup;

  constructor(
    public formulario:FormBuilder, 
    private personaService:PersonaService,
    private ruteador:Router
    ) { 
    this.formularioPersonas=this.formulario.group({
      Nombre:[''],
      Edad:[''],
      Apellido:['']      
    });
  }

  ngOnInit(): void {        
  }  

  enviarDatos():any{    
    //console.log(this.formularioPersonas.value);
    const formData = new FormData();    
    formData.append('Nombre', this.formularioPersonas.get('Nombre')!.value);
    formData.append('Edad', this.formularioPersonas.get('Edad')!.value);
    formData.append('Apellido', this.formularioPersonas.get('Apellido')!.value);
        
    this.personaService.AgregarPersona(formData).subscribe((respuesta)=>{
      console.log(respuesta);
      Swal.fire(
        'Mantenedor de Personas',
        respuesta.descripcion,
        'success'
      );
      this.ruteador.navigateByUrl('/listar-persona');
      }, err => {
        Swal.fire(
          'Mantenedor de Personas',
          err.error,
          'error'
        );
    });
  }
}

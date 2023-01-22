import { Component, OnInit  } from '@angular/core';
import { PersonaService } from 'src/app/servicio/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {
  Personas:any;

  constructor(
    private personaService:PersonaService
  ) { }

  ngOnInit(): void {
    this.personaService.ObtenerPersonas().subscribe(respuesta=>{
      console.log(respuesta);
      this.Personas=respuesta;
    });
  }

  borrarRegistro(id:any,iControl:any){
    console.log(id);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
    this.personaService.BorrarPersona(id).subscribe((respuesta)=>{
      Swal.fire(
        'Mantenedor de Personas',
        respuesta.descripcion,
        'success'
      );
      this.Personas.splice(iControl,1);
    }, err => {
      Swal.fire(
        'Mantenedor de Personas',
        err.error,
        'error'
      );
  });
    }
  }
}

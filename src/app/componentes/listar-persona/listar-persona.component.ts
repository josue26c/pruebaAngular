import { Component, OnInit  } from '@angular/core';
import { PersonaService } from 'src/app/servicio/persona.service';

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
      this.Personas.splice(iControl,1);
    });
    }
  }
}

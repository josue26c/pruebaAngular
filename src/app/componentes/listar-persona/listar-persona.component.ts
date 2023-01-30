import {  AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { PersonaService } from 'src/app/servicio/persona.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['nombre','apellido','edad'];
  dataSource = new MatTableDataSource();
  Personas:any;
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private personaService:PersonaService
  ) { }

  ngOnInit(): void {    
    this.personaService.ObtenerPersonas()
    /*.pipe(      
      
      catchError(err =>{    
      alert(err.error.descripcion);
      return throwError(()=>null);
    })
    )*/.subscribe({
        next: (datos) => this.dataSource.data = datos,
        error: (e) => Swal.fire(
          'Mantenedor de Personas',
          e.error.descripcion,
          'error'
        ),
        complete: ()=> console.info('complete')
    })
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

 applyFilter(event:Event){
  const filterValue =(event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
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

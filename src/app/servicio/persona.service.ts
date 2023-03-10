import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  API: string='https://localhost:7146/api/personas/';

  constructor(private clienteHttp:HttpClient) { }

  AgregarPersona(datosPersona:any):Observable<any>{
    console.log(datosPersona);
    return this.clienteHttp.post(this.API,datosPersona);
  }

  ObtenerPersonas(){
    return this.clienteHttp.get<any>(this.API);
  }

  BorrarPersona(id:any):Observable<any>{
    return this.clienteHttp.delete(this.API+id);
  }

  ObtenerPersona(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+id);
  }

  EditarPersona(id:any,datosPersona:any):Observable<any>{    
    return this.clienteHttp.put(this.API+id,datosPersona);
  }  
 handlerError(errorMsj:any): Observable<never> {
    let errorMessage ='Error Desconocido';
    if(errorMsj){
      debugger;
      errorMessage = 'Error' + errorMsj.error.descripcion;
    }    
    return throwError(() => errorMessage);
 }
}

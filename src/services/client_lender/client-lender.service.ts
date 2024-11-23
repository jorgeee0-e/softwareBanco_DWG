import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Interfaces/Interfaces';
import { constantes } from 'src/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class ClientLenderService {

  
constructor(private httpClient: HttpClient) { }

  get(path: string): Observable<any>{
    return this.httpClient.get(constantes.API_ENDPOINT+constantes.METHODS.CLIENTS.GET_CLIENTS+path).pipe(response=>response);
  }

  post(object: Client):Observable<any>{
    return this.httpClient.post(constantes.API_ENDPOINT+constantes.METHODS.CLIENTS.API+constantes.METHODS.CLIENTS.CREATE_CLIENTS, object).pipe(response=>response);
  }

  delete(path: string):Observable<any>{
    return this.httpClient.delete(constantes.API_ENDPOINT+constantes.METHODS.CLIENTS.API+constantes.METHODS.CLIENTS.DELETE+path).pipe(response=>response);
  }
  update(path: string, object: Client):Observable<any>{
    return this.httpClient.put(constantes.API_ENDPOINT+constantes.METHODS.CLIENTS.API+constantes.METHODS.CLIENTS.UPDATE+path, object).pipe(request=>request);
  }
}

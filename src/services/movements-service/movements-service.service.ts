import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/Interfaces/Interfaces';
import { constantes } from 'src/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

constructor(private httpClient: HttpClient) { }
get(path: string): Observable<any>{
  return this.httpClient.get(constantes.API_ENDPOINT+constantes.METHODS.MOVEMENTS.GET+path).pipe(response=>response);
}

post(object: Transaction):Observable<any>{
  return this.httpClient.post(constantes.API_ENDPOINT+constantes.METHODS.MOVEMENTS.API+constantes.METHODS.MOVEMENTS.CREATE, object).pipe(response=>response);
}

}

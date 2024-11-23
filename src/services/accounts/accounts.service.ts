import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Interfaces/Interfaces';
import { constantes } from 'src/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

constructor( private httpClient: HttpClient) { }
get(path: string): Observable<any>{
  return this.httpClient.get(constantes.API_ENDPOINT+constantes.METHODS.ACCOUNTS.GET+path).pipe(response=>response);
}

post(object: Account):Observable<any>{
  return this.httpClient.post(constantes.API_ENDPOINT+constantes.METHODS.ACCOUNTS.API+constantes.METHODS.CLIENTS.CREATE_CLIENTS, object).pipe(response=>response);
}

delete(path: string):Observable<any>{
  return this.httpClient.delete(constantes.API_ENDPOINT+constantes.METHODS.ACCOUNTS.API+constantes.METHODS.ACCOUNTS.DELETE+path).pipe(response=>response);
}
update(path: string, object: Account):Observable<any>{
  return this.httpClient.put(constantes.API_ENDPOINT+constantes.METHODS.ACCOUNTS.API+constantes.METHODS.ACCOUNTS.UPDATE+path, object).pipe(request=>request);
}
}

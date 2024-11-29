import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, LoginResponse, User } from 'src/app/Interfaces/Interfaces';
import { constantes } from 'src/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor( private httpClient: HttpClient) { }

login(user: Auth): Observable<LoginResponse>{
  const header = new HttpHeaders({'Content-Type': 'application/json'})
  return this.httpClient.post<LoginResponse>(constantes.API_ENDPOINT+constantes.METHODS.LOGIN.API+constantes.METHODS.LOGIN.LOGIN,user)
}

getUsers(login: LoginResponse):Observable<User[]>{
  const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${login.token}`});
  return this.httpClient.get<User[]>(`${constantes.API_ENDPOINT}${constantes.METHODS.LOGIN.GET}`,{headers: header});
}
}

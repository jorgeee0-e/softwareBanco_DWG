import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login/login.service';
import { Auth, Client, LoginResponse } from '../Interfaces/Interfaces';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  credentials: Auth = {
    username: '',
    password: 'string',
  }
  
   respuesta: LoginResponse ={
    token: '',
    role: '',
    }
   infoCliente: Client ={
      id: '',
      name: '',
      lastname: '',
      birthday: new Date,
      dui: '',
      address: '',
      email: '',
      phone: '',
      work_place: '',
      work_start: '',
      occupation: '',
      work_email: '',
      work_phone: '',
      salary: 0.00,
      credit_limit: 0 ,
      role: "Cliente",
      user_id: null,
    }


  constructor(private router: Router,
              private lgnSrv: LoginService,
              private clSrv: ClientLenderService,
  ) {}
  ngOnInit(){
  }

  onSubmit() {
    // TODO: temporalmente solo validamos que el usuario y la contrasaña no vengan vacias, debemos agregar la logica para el login.
    this.login((loginResponse)=>{
      this.getUserInfo(loginResponse);
    })
  }

  login(callback?: (login: LoginResponse)=> void){
    console.log(this.credentials);
    this.lgnSrv.login(this.credentials).subscribe({
      next:(value)=> {
          console.log(value);
          if(callback){
            callback(value);
          }
      },
      error:(err)=> {
          console.log(err);
      },
    });
  }

  getUserInfo(login: LoginResponse){
    this.lgnSrv.getUsers(login).subscribe({
      next:(value)=> {
          console.log(value);
      },
      error:(err)=> {
          console.log(err);
      },
    })
  }

  getClient(){
    this.clSrv.get('/').subscribe({
      next:(value: Client[])=> {
          this.infoCliente = value.filter((cliente: Client)=>{
            const match = cliente.user_id?.username== this.credentials.username;
            return match;
          })[0];
      },
      error:(err)=> {
          console.log(err)
      },
    })
  }
}
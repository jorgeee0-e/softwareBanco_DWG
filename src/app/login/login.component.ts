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
    // Validar que los campos no estén vacíos
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Por favor, ingresa tu usuario y contraseña.';
      return;
    }
  
    // Lógica de login
    this.login((loginResponse) => {
      // Obtener información del usuario después del login exitoso
      this.getUserInfo(loginResponse, () => {
        // Redirigir a la página principal si todo es exitoso
        this.router.navigate(['/view-customer']);
      });
    });
  }

  login(callback?: (login: LoginResponse) => void) {
    this.lgnSrv.login(this.credentials).subscribe({
      next: (value) => {
        console.log(value);
        if (value.token) {
          localStorage.setItem('authToken', value.token);
          callback?.(value);
        } else {
          this.errorMessage = 'Error al iniciar sesión: Token no recibido.';
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error al iniciar sesión: Verifica tus credenciales.';
      },
    });
  }
  

  getUserInfo(login: LoginResponse, onSuccess: () => void) {
    this.lgnSrv.getUsers(login).subscribe({
      next: (value) => {
        console.log('Información del usuario:', value);
        const user = {
          username: value[0].username,
          role: login.role
        };
        localStorage.setItem('user', JSON.stringify(user));
        const username = value[0]?.username;
        if (username) {
          this.clSrv.getClientByUsername(username).subscribe({
            next: (clientData) => {
              localStorage.setItem('clientId', clientData.clientId);
              onSuccess();
            },
            error: (err) => {
              console.log('Error obteniendo clientId:', err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Error al obtener información del usuario.';
      },
    });
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
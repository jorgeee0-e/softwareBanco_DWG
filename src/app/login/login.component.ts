import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // TODO: temporalmente solo validamos que el usuario y la contraña no vengan vacias, debemos agregar la logica para el login.
    if (this.username && this.password) {
      this.router.navigate(['/clerk-summary']);
    } else {
      this.errorMessage = 'Por favor, ingrese usuario y contraseña';
    }
  }
}
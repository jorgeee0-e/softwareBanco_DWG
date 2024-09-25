import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  accountType: string = '';
  initialDeposit: number = 0;
  currency: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.initialDeposit <= 0) {
      this.errorMessage = 'El depósito inicial debe ser mayor que cero.';
      return;
    }
    // TODO: tenemos pendiente agregar la logica para crear la cuenta.
    console.log('Cuenta creada', { accountType: this.accountType, initialDeposit: this.initialDeposit, currency: this.currency });
    this.successMessage = 'Cuenta creada exitosamente.';
    // Tempralmente agregamos una redireccion despues de 2 segundos.
    setTimeout(() => {
      this.router.navigate(['/add-customer']);
    }, 2000);
  }
}
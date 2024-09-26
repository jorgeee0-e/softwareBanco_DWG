import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css']
})
export class DepositMoneyComponent implements OnInit {
  depositForm: FormGroup;
  accounts: string[] = ['1234-5678-9012-3456', '2345-6789-0123-4567', '3456-7890-1234-5678'];
  depositTypes: string[] = ['Efectivo', 'Cheque', 'Transferencia'];
  isProcessing: boolean = false;
  depositSuccess: boolean = false;

  constructor(private fb: FormBuilder) {
    this.depositForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      depositType: ['', Validators.required],
      depositorName: ['', Validators.required],
      depositorId: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.depositForm.valid) {
      this.isProcessing = true;
      //  aca simulamos el proceso de deposito
      setTimeout(() => {
        this.isProcessing = false;
        this.depositSuccess = true;
        console.log('Depósito realizado:', this.depositForm.value);
        // Aquí se agregara la logica para enviar los datos al backend
      }, 2000);
    }
  }

  resetForm() {
    this.depositForm.reset();
    this.depositSuccess = false;
  }
}
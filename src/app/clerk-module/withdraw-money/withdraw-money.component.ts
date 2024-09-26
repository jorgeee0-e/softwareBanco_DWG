import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {
  withdrawForm: FormGroup;
  accounts: string[] = ['1234-5678-9012-3456', '2345-6789-0123-4567', '3456-7890-1234-5678'];
  withdrawalTypes: string[] = ['Efectivo', 'Cheque', 'Transferencia'];
  isProcessing: boolean = false;
  withdrawalSuccess: boolean = false;

  constructor(private fb: FormBuilder) {
    this.withdrawForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      withdrawalType: ['', Validators.required],
      withdrawerName: ['', Validators.required],
      withdrawerId: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.withdrawForm.valid) {
      this.isProcessing = true;
      // Simulamos el proceso de retiro
      setTimeout(() => {
        this.isProcessing = false;
        this.withdrawalSuccess = true;
        console.log('Retiro realizado:', this.withdrawForm.value);
        // Aquí iría la lógica para enviar los datos al backend
      }, 2000);
    }
  }

  resetForm() {
    this.withdrawForm.reset();
    this.withdrawalSuccess = false;
  }
}
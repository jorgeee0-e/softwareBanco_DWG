import { Component, OnInit } from '@angular/core';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: Date;
  description: string;
}

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  transactions: Transaction[] = [];
  accountNumber: string = '1234-5678-9012-3456'; // Mostrmos un numero de cuenta de ejemplo

  constructor() { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    // Datos de prueba o de muestra
    this.transactions = [
      { id: 1, type: 'deposit', amount: 500, date: new Date('2023-09-01'), description: 'Depósito en Agencia Santa Elena' },
      { id: 2, type: 'withdrawal', amount: 100, date: new Date('2023-09-05'), description: 'Retiro ATM Centro Comercial Galerías' },
      { id: 3, type: 'transfer', amount: 200, date: new Date('2023-09-10'), description: 'Transferencia a cuenta Cuscatlán' },
      { id: 4, type: 'deposit', amount: 1000, date: new Date('2023-09-15'), description: 'Depósito de nómina' },
      { id: 5, type: 'withdrawal', amount: 50, date: new Date('2023-09-20'), description: 'Retiro ATM Metrocentro' },
      { id: 6, type: 'transfer', amount: 300, date: new Date('2023-09-25'), description: 'Pago de servicios' },
      { id: 7, type: 'deposit', amount: 250, date: new Date('2023-09-28'), description: 'Depósito en Agencia La Skina' },
      { id: 8, type: 'withdrawal', amount: 75, date: new Date('2023-09-30'), description: 'Retiro ATM Plaza Mundo' }
    ];
  }

  getTransactionTypeIcon(type: 'deposit' | 'withdrawal' | 'transfer'): string {
    switch(type) {
      case 'deposit': return 'bx bx-down-arrow-alt';
      case 'withdrawal': return 'bx bx-up-arrow-alt';
      case 'transfer': return 'bx bx-transfer';
      default: return 'bx bx-question-mark';
    }
  }
}
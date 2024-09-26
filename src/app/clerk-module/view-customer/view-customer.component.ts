import { Component, OnInit } from '@angular/core';

interface Account {
  id: string;
  type: 'savings' | 'checking';
  number: string;
  balance: number;
}

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
  accounts: Account[] = [
    { id: '1', type: 'savings', number: '1234-5678-9012-3456', balance: 5000 },
    { id: '2', type: 'savings', number: '2345-6789-0123-4567', balance: 3000 },
    { id: '3', type: 'checking', number: '3456-7890-1234-5678', balance: 2000 }
  ];

  selectedAccount: Account = this.accounts[0];
  transactions: Transaction[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  onAccountSelect(account: Account) {
    this.selectedAccount = account;
    this.loadTransactions();
  }

  loadTransactions() {
    // Generamos transacciones únicas para cada cuenta
    const baseTransactions: Transaction[] = [
      { id: 1, type: 'deposit', amount: 500, date: new Date('2023-08-31'), description: 'Depósito en Agencia Santa Elena' },
      { id: 2, type: 'withdrawal', amount: 100, date: new Date('2023-09-04'), description: 'Retiro ATM Centro Comercial Galerías' },
      { id: 3, type: 'transfer', amount: 200, date: new Date('2023-09-10'), description: 'Transferencia a cuenta Cuscatlán' },
      { id: 4, type: 'deposit', amount: 1000, date: new Date('2023-09-15'), description: 'Depósito de nómina' },
      { id: 5, type: 'withdrawal', amount: 50, date: new Date('2023-09-20'), description: 'Retiro ATM Metrocentro' }
    ];

    // Modificamos las transacciones base según la cuenta seleccionada
    this.transactions = baseTransactions.map(transaction => ({
      ...transaction,
      amount: transaction.amount * (parseInt(this.selectedAccount.id) * 0.8 + 0.6), // Variamos los montos
      date: new Date(transaction.date.getTime() + parseInt(this.selectedAccount.id) * 24 * 60 * 60 * 1000) // Variamos las fechas
    }));

    // Añadimos algunas transacciones específicas según el tipo de cuenta
    if (this.selectedAccount.type === 'savings') {
      this.transactions.push({
        id: 6,
        type: 'deposit',
        amount: 250,
        date: new Date('2023-09-25'),
        description: 'Intereses ganados'
      });
    } else if (this.selectedAccount.type === 'checking') {
      this.transactions.push({
        id: 6,
        type: 'withdrawal',
        amount: 75,
        date: new Date('2023-09-28'),
        description: 'Pago de cheque #1234'
      });
    }

    // Ordenamos las transacciones por fecha, de la más reciente a la más antigua
    this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  getTransactionTypeIcon(type: 'deposit' | 'withdrawal' | 'transfer'): string {
    switch(type) {
      case 'deposit': return 'bx bx-down-arrow-alt';
      case 'withdrawal': return 'bx bx-up-arrow-alt';
      case 'transfer': return 'bx bx-transfer';
      default: return 'bx bx-question-mark';
    }
  }

  getAccountTypeLabel(type: 'savings' | 'checking'): string {
    return type === 'savings' ? 'Ahorro' : 'Corriente';
  }
}
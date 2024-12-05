import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Client, MovementType, Transaction } from 'src/app/Interfaces/Interfaces';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { map} from 'rxjs';
import { AccountsService } from 'src/services/accounts/accounts.service';
import { MovementsService } from 'src/services/movements-service/movements-service.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  accPath: string = '';
  clientId: string = '';
  accounts: Account []=[];
  cuentasDeCliente: Account []=[];
  client: Client ={
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
  selectedAccount: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  cuentaSeleccionada: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  transactions: Transaction = {
    id: '',
    description: '',
    type: 'deposit',
    amount: 0.00,
    date: new Date(),
    account_transmitter: this.selectedAccount,
    account_receiver: this.selectedAccount,

  }

  todasTransacciones: Transaction[]=[]
  transaccionesDeCliente: Transaction[]=[]
  constructor( private route: ActivatedRoute,
               private clSrv: ClientLenderService,
               private cuentaServicio: CuentaService,
               private accntSrv: AccountsService,
               private mvtSrv: MovementsService,
  ) { }

  ngOnInit(): void {
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      this.clientId = storedClientId;
      this.getAccounts();
      this.getMovements();
    } else {
      console.log('clientId no encontrado en localStorage.');
    }
}

  onAccountSelect(account: Account) {
    this.selectedAccount = account;
  }


  getTransactionTypeIcon(type: 'deposit' | 'withdrawal' | 'transfer_in'| 'transfer_out' | 'vacio'): string {
    switch(type) {
      case 'deposit': return 'bx bx-down-arrow-alt';
      case 'withdrawal': return 'bx bx-up-arrow-alt';
      case 'transfer_in': return 'bx bx-transfer';
      case 'transfer_out': return 'bx bx-transfer';
      default: return 'bx bx-question-mark';
    }
  }

  getAccounts() {
    this.accntSrv.get(this.accPath).subscribe({
      next: (result) => {
        console.log('Cuentas recibidas:', result);
        this.cuentasDeCliente = result.map((account: Account) => ({
          id: account.id,
          type: account.type,
          balance: account.balance,
          currency: account.currency,
          client: account.client
        }));
        console.log('Cuentas asignadas:', this.cuentasDeCliente);
      },
      error: (err) => {
        console.error('Error al obtener cuentas:', err);
      }
    });
  }
  

  getMovements(){
    this.mvtSrv.get('').subscribe({
      next:(value)=> {
        this.todasTransacciones = value;
        console.log(this.todasTransacciones);
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }

  filterMovements(){
    this.transaccionesDeCliente = this.todasTransacciones.filter((transaccion: Transaction)=> {
      const cuentas = transaccion.account_transmitter.id== this.selectedAccount.id;
      return cuentas
    })
  }

  filterAccountsById() {
    console.log('Cuentas antes de filtrar:', this.accounts);
    const sliced = this.clientId.startsWith('/') ? this.clientId.slice(1) : this.clientId;
    console.log('Criterio de filtrado:', sliced);
    this.cuentasDeCliente = this.accounts.filter((cuenta: Account) => {
      return cuenta.client && cuenta.client.id === sliced;
    });
    console.log('Cuentas después de filtrar:', this.cuentasDeCliente);
  }
  

  //Peticion HTTP para cargar el cliente
  getClientById() {
    const path = this.clientId.startsWith('/') ? this.clientId : `/${this.clientId}`;
    this.clSrv.get(path).subscribe({
      next: (result) => {
        this.client = result;
        console.log(this.client);
      },
      error: (err) => {
        console.error('Error obteniendo el cliente:', err);
      },
    });
  }
  
  getCuentaById(idCuenta: string){
    this.accntSrv.get("/"+idCuenta).subscribe({
      next: (value)=> {
        console.log(value)
        this.cuentaSeleccionada = value;
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }
  
  getAccountToReview(idCuenta: string){
    this.getCuentaById(idCuenta);
    this.cuentaServicio.setCuenta(this.selectedAccount);
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Client } from 'src/app/Interfaces/Interfaces';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { map} from 'rxjs';
import { AccountsService } from 'src/services/accounts/accounts.service';

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
  }
  selectedAccount: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  constructor( private route: ActivatedRoute,
               private clSrv: ClientLenderService,
               private cuentaServicio: CuentaService,
               private accntSrv: AccountsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.clientId="/"+params.get('id')|| '';
      console.log("Id del cliente", this.clientId)
      });
      
      this.getAccounts();

      /* this.cuentaServicio.getCuenta().subscribe(estaCuenta =>{
        if(estaCuenta){
          this.selectedAccount = estaCuenta as Account;
        }
      }); */
/*   console.log("cuenta seleccionada: ",this.selectedAccount); */
}

  onAccountSelect(account: Account) {
    this.selectedAccount = account;
    this.loadTransactions();
  }

  loadTransactions() {
    // Ordenamos las transacciones por fecha, de la más reciente a la más antigua
/*     this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime()); */
  }

  getTransactionTypeIcon(type: 'deposit' | 'withdrawal' | 'transfer'): string {
    switch(type) {
      case 'deposit': return 'bx bx-down-arrow-alt';
      case 'withdrawal': return 'bx bx-up-arrow-alt';
      case 'transfer': return 'bx bx-transfer';
      default: return 'bx bx-question-mark';
    }
  }

  getAccounts(){
    this.accntSrv.get(this.accPath).subscribe({
      next: (result)=> {
        this.accounts= result;
        console.log(this.accounts);
        this.getClientById();
      },
      error:(err)=> {
        console.log(err);
      },
    });
    

  }

  filterAccountsById(){
    console.log("A filtrar: ",this.accounts)
    
    const sliced = this.clientId.startsWith('/') ? this.clientId.slice(1): this.clientId;
    console.log("Criterio: ",sliced);
    this.cuentasDeCliente= this.accounts.filter((cuenta: Account)=>{
      const matches = cuenta.client!= null && cuenta.client.id== sliced;
      return matches;
    });
    console.log("Filtrado",this.cuentasDeCliente);
  }

  //Peticion HTTP para cargar el cliente
  getClientById(){
    this.clSrv.get(this.clientId).subscribe({
      next:(result)=> {
        this.client= result;
        console.log(this.client);
      },
      error:(err)=> {
        console.log(err);
      },
    });
    this.filterAccountsById();
  };
  
}


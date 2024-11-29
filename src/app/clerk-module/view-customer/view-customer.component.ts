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
    this.route.paramMap.subscribe(params=>{
      this.clientId="/"+params.get('id')|| '';
      console.log("Id del cliente", this.clientId)
      });
      
      this.getAccounts();
      this.getMovements();

      /* this.cuentaServicio.getCuenta().subscribe(estaCuenta =>{
        if(estaCuenta){
          this.selectedAccount = estaCuenta as Account;
        }
      }); */
/*   console.log("cuenta seleccionada: ",this.selectedAccount); */
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


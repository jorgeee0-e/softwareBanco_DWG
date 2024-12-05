import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Account, Client, Transaction } from 'src/app/Interfaces/Interfaces';
import { AccountsService } from 'src/services/accounts/accounts.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { MovementsService } from 'src/services/movements-service/movements-service.service';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css']
})
export class DepositMoneyComponent implements OnInit {
  depositForm: FormGroup;
  selectedDepositType: string = '';
  accPath: string = '';
  accounts: Account[]=[];
  accountsFiltradas: Account[] = [];
  depositTypes: string[] = ['Déposito', 'Transferencia'];
  isProcessing: boolean = false;
  cuenta$: Observable<Account|Account[]> = new Observable<Account>();
  depositSuccess: boolean = false;

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
    user_id:null,
  }
  

  //Cuenta desde donde comienza la transferencia o a la que se le deposita
  cuentaADepositar: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  //Cuenta que recibirá la transferencia
  cuentaQueRecibe: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  mainMovement: Transaction = {
    id:'',
    description: 'string',
    type: 'deposit',
    amount: 0.00,
    date: new Date(),
    account_transmitter: this.cuentaADepositar,
    account_receiver: this.cuentaADepositar,
  }
  secondaryMovement: Transaction = {
    id:'',
    description: '',
    type: 'deposit',
    amount: 0.00,
    date: new Date(),
    account_transmitter: this.cuentaQueRecibe,
    account_receiver: this.cuentaADepositar,
  }
  transactionsToSend: Transaction []= [];
  constructor(private fb: FormBuilder, 
              private cuentaServicio: CuentaService,
              private accntSrv: AccountsService,
              private mvtSrv: MovementsService,
              private cdr: ChangeDetectorRef) {

    //declaracion de deposit form            
    this.depositForm = this.fb.group({
      accountNumber: ['', Validators.nullValidator],
      amount: ['', [Validators.required, Validators.min(1)]],
      depositType: ['', Validators.required],
      depositorName: ['', Validators.nullValidator],
      depositorId: ['', Validators.nullValidator],
      /* dui: ['', Validators.nullValidator], */
      dui: ['',Validators.min(9)],
      cuentaQueRecibe: [''],
      notes: ['']
    });
    //Condiciones para validar dui y cuenta receptora
    this.depositForm.get('depositType')?.valueChanges.subscribe((value)=>{
      const receiverIdControl = this.depositForm.get('dui');
      const depositAccountControl = this.depositForm.get('cuentaQueRecibe')
      if(value=="Transferencia"){
        receiverIdControl?.setValidators([Validators.required]);
        depositAccountControl?.setValidators([Validators.required]);
      }else{
        receiverIdControl?.clearValidators();
        depositAccountControl?.clearValidators();
      }
      receiverIdControl?.updateValueAndValidity();
    })
    this.getAccounts();

  }


  ngOnInit(): void {
    // Obtener la cuenta seleccionada desde el servicio
    this.cuentaServicio.getCuenta().subscribe((estaCuenta) => {
      if (estaCuenta) {
        this.cuentaADepositar = estaCuenta as Account;
        console.log('Cuenta a depositar cargada:', this.cuentaADepositar);
  
        // Actualizar valores en el formulario
        this.depositForm.patchValue({
          accountNumber: this.cuentaADepositar.id,
          depositorName: `${this.cuentaADepositar.client?.name} ${this.cuentaADepositar.client?.lastname}`,
          depositorId: this.cuentaADepositar.client?.id,
        });
      }
    });
  }
  
  getAccountById(){
    console.log(this.cuentaADepositar.id);
     this.accntSrv.get("/"+this.cuentaADepositar.id).subscribe({
      next: (value)=> {
        this.cuentaADepositar = value;
        console.log(this.cuentaADepositar);        
      },
      error:(err)=> {
        console.log(err)
      },
    })

  }

  onSubmit() {
    this.mapFormValues();
    console.log(this.cuentaADepositar);
    console.log(this.cuentaQueRecibe)    
    console.log(this.mainMovement);
    console.log(this.secondaryMovement);
    
    if (this.depositForm.valid) {
      this.isProcessing = true;
      //  aca simulamos el proceso de deposito
      this.transactionsToSend=[this.mainMovement];
      if(this.selectedDepositType=='Transferencia'){
        this.transactionsToSend.push(this.secondaryMovement);
      }
      this.createTransactions(()=>{
        this.isProcessing = false;
        this.depositSuccess = true;
      });
    }
  }

  mapFormValues() {
    const formValues = this.depositForm.value;
  
    if (this.selectedDepositType === 'Transferencia') {
      this.mainMovement = {
        id: '',
        description: formValues.notes || `Transferencia realizada: ${new Date()}`,
        type: 'transfer_out',
        amount: formValues.amount,
        date: new Date(),
        account_transmitter: this.cuentaADepositar,
        account_receiver: this.cuentaQueRecibe,
      };
  
      this.secondaryMovement = {
        id: '',
        description: formValues.notes || `Transferencia recibida: ${new Date()}`,
        type: 'transfer_in',
        amount: formValues.amount,
        date: new Date(),
        account_transmitter: this.cuentaQueRecibe,
        account_receiver: this.cuentaADepositar,
      };
    } else {
      this.mainMovement = {
        id: '',
        description: formValues.notes || `Depósito realizado: ${new Date()}`,
        type: 'deposit',
        amount: formValues.amount,
        date: new Date(),
        account_transmitter: this.cuentaADepositar,
        account_receiver: this.cuentaADepositar,
      };
    }
  
    console.log('Movimiento principal mapeado:', this.mainMovement);
    console.log('Movimiento secundario mapeado:', this.secondaryMovement);
  }  

  createTransactions(callback: () => void){
    let pending= this.transactionsToSend.length;
    this.transactionsToSend.forEach((transaccion)=>{
      this.mvtSrv.post(transaccion).subscribe({
        next:(value)=> {
          console.log(value);
          pending--;
          if(pending==0){
            callback();
          }
        },
        error:(err)=> {
          console.log(err);
          pending--;
          if(pending==0){
            callback();
          }
        },
      })
    })
  }

  resetForm() {
    this.depositForm.reset();
    this.depositSuccess = false;
  }

  getAccounts(){
    this.accntSrv.get(this.accPath).subscribe({
      next: (result)=> {
        this.accounts= result;
        console.log(this.accounts);
      },
      error:(err)=> {
        console.log(err);
      },
    });
    
  }

  getAccountsByDui(dui: string) {
    console.log('Filtrando cuentas por DUI:', dui);
    this.accountsFiltradas = this.accounts.filter(
      (cuenta: Account) => cuenta.client?.dui === dui
    );
    console.log('Cuentas filtradas:', this.accountsFiltradas);
  }  

  createTransaction(){

  }
  
  onAccountChange(accId: string){
    console.log(accId);
    if(accId){
      this.accntSrv.get("/"+accId).subscribe({
        next: (value)=> {
          this.cuentaQueRecibe = value;
          console.log(this.cuentaQueRecibe);        
        },
        error:(err)=> {
          console.log(err)
        },
      })
    }
    console.log()
  }
}
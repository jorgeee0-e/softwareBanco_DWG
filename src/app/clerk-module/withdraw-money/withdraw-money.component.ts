import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Account, Client, Transaction } from 'src/app/Interfaces/Interfaces';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { MovementsService } from 'src/services/movements-service/movements-service.service';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {
  withdrawForm: FormGroup;
  accounts: string[] = ['1234-5678-9012-3456', '2345-6789-0123-4567', '3456-7890-1234-5678'];
  isProcessing: boolean = false;
  withdrawalSuccess: boolean = false;
  
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
    //Cuenta donde se depositara el dinero. 
  cuentaADepositar: Account = {
      id: '',
      type: 'Ahorro',
      balance: 0.00,
      currency: 'Dolar',
      client: this.client,
  }
  //Transaccion que se envia
  mainMovement: Transaction = {
    id:'',
    description: 'string',
    type: 'deposit',
    amount: 0.00,
    date: new Date(),
    account_transmitter: this.cuentaADepositar,
    account_receiver: this.cuentaADepositar,
  }
  constructor(private fb: FormBuilder,
              private cuentaServicio: CuentaService,
              private mvtSrv: MovementsService
  ) {
    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.cuentaServicio.getCuenta().subscribe(estaCuenta=>{
      this.cuentaADepositar= estaCuenta as Account;
    });
    this.setMax();
  }
  mapFormValues(){
    const formValues = this.withdrawForm.value;
    this.mainMovement={
      id:'',
      description: formValues.notes || "Transacciónde retiro realizada on: "+ new Date(),
      type: 'withdrawal',
      amount: formValues.amount,
      date: new Date(),
      account_transmitter: this.cuentaADepositar,
      account_receiver: this.cuentaADepositar,
    }
  }

  createTransaction(callback:(succes: boolean)=>void){
    console.log(this.mainMovement)
    this.mvtSrv.post(this.mainMovement).subscribe({
      next:(value)=> {
        console.log(value);
        callback(true);
      },
      error:(err)=> {
        console.log(err);
        callback(false);
      },
    })
  }
  onSubmit() {
    this.mapFormValues();
    if (this.withdrawForm.valid) {
      this.isProcessing = true;
      // Simulamos el proceso de retiro
      this.createTransaction((success)=>{
        this.isProcessing = false;
        if(success){
          this.withdrawalSuccess=true;
        }else{
          this.withdrawalSuccess=false;
        }
      })
    }
  }
  resetForm() {
    this.withdrawForm.reset();
    this.withdrawalSuccess = false;
  }
  //Validador de balance a retirar
  validarBalance(maxBalance: number): ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null =>{
      const value = control.value;
      if(value!== null && value>maxBalance){
        return {maxBalance: {value: value, max: maxBalance}}
      }
      return null;
    }
    
  }
  //Configurar el mayor valor a retirar
  setMax(){
    if(this.cuentaADepositar){
      const max = this.cuentaADepositar.balance;
      const control = this.withdrawForm.get('amount');
      control?.setValidators([
        Validators.required,
        Validators.min(1),
        this.validarBalance(max),
      ]);
      control?.updateValueAndValidity();
    }
  }
}
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from 'src/app/Interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private selectedAccount= new BehaviorSubject<Account | Account[]>({
    id: 'string',
    type: 'Ahorro',
    balance: 0.00,
    currency: 'Dolar',
    client: null,
  });

  setCuenta(cuenta: Account | Account[]){
    if(Array.isArray(cuenta)){
      this.selectedAccount.next(cuenta)
    } else{
      this.selectedAccount.next([cuenta]);
    }
    
  }
  getCuenta(): Observable<Account | Account[]>{
    return this.selectedAccount.asObservable();
  }
constructor() { }

}

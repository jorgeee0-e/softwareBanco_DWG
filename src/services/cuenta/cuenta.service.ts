import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account, Client } from 'src/app/Interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private selectedAccount= new BehaviorSubject<Account | null>(null);

  /* setCuenta(cuenta: Account | Account[]){
    if(Array.isArray(cuenta)){
      this.selectedAccount.next(cuenta)
    } else{
      this.selectedAccount.next([cuenta]);
    }
    
  }
  getCuenta(): Observable<Account | Account[]>{
    return this.selectedAccount.asObservable();
  } */

    setCuenta(client: Account):void{
      this.selectedAccount.next(client);
    }
  
    getCuenta(): Observable<Account|null>{
      return this.selectedAccount.asObservable();
    }
constructor() { }

}

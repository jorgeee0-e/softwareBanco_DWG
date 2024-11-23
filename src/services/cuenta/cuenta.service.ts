import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from 'src/app/Interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  @Output() disparadorDeCuentas: EventEmitter<any> = new EventEmitter()
  private selectedAccount= new BehaviorSubject<Account[] | null > (null);

  setCuenta(cuenta: Account[]){
    this.selectedAccount.next(cuenta);
  }
  getCuenta(): Observable<Account[]| null>{
    return this.selectedAccount.asObservable();
  }
constructor() { }

}

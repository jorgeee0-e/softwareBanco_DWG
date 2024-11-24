import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/Interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
/*   @Output() disparadorDeCliente: EventEmitter<any> = new EventEmitter(); 
 */  private selectedClient= new BehaviorSubject< Client | null>(null);

  setClient(client: Client):void{
    this.selectedClient.next(client);
  }

  getClient(): Observable<Client|null>{
    return this.selectedClient.asObservable();
  }

constructor() { }

}

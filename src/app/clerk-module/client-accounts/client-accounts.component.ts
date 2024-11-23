import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Account, Client } from 'src/app/Interfaces/Interfaces';
import { ClientService } from 'src/services/client/client.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';

@Component({
  selector: 'app-client-accounts',
  templateUrl: './client-accounts.component.html',
  styleUrls: ['./client-accounts.component.css']
})
export class ClientAccountsComponent implements OnInit {
  @ViewChild('cuentas') cuentas!: ElementRef;
  @ViewChild('label') label!: ElementRef;
  constructor( private cuentaService: CuentaService,
                private clienteService: ClientService) { }
  
  cuentasDeCliente: Account []=[];
  clientSend: Client ={
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
  ngOnInit() { 
    this.clienteService.disparadorDeCliente.subscribe((client)=>{
      if(client){
        this.clientSend = client;
        console.log(client)
      }
      
    });
  }
  

  show(){ 
    console.log("clic")
    /* this.filtrarByDui(); */
    const display = window.getComputedStyle(this.cuentas.nativeElement).display;
    console.log(display)
    if(display=="block"){
      this.cuentas.nativeElement.style.display="none";
      this.label.nativeElement.textContent ="Mostrar cuentas";
    }else{
      this.cuentas.nativeElement.style.display="block";
      this.label.nativeElement.textContent ="Ocultar cuentas";
    } /* if(this.cuentasDeCliente.length>0){
      
      
      this.label.nativeElement.textContent ="Ocultar cuentas";
    } */
  }

}

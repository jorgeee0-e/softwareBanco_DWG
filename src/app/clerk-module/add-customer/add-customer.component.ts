import { Component, ElementRef, OnInit, ViewChild, NgModule, Renderer2 } from '@angular/core';
import { zip } from 'rxjs';
import { Account, Client } from 'src/app/Interfaces/Interfaces';
import { AccountsService } from 'src/services/accounts/accounts.service';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  
  constructor( private renderer: Renderer2, 
               private sdBrSrv: SidebarStateService, 
               private clSrv: ClientLenderService,
               private accntSrv: AccountsService,
               private cuentaServicio: CuentaService) { }
  @ViewChild('dropd') dropd!:ElementRef;
  @ViewChild('content') content!:ElementRef;
  @ViewChild('delete') delete!: ElementRef;
  //Declaracion de objeto para guardar clientes de la respuesta de la peticion
  client: Client[]=[];
  accounts: Account[]=[];
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
  accountSend: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.clientSend,
  }
  //Variable path para asignarle el path dependiendo de la peticion a hacer. 
  path :string = '';
  accPath: string= '';

  ngOnInit() {
    this.getClients();
    this.getAccounts();
  }


  updateButtonText(text: string){
    this.dropd.nativeElement.textContent=text;
  }

  checker(){
   console.log("click")
  }

  ngAfterViewInit(){
    const cont = this.content.nativeElement.closest('.home_content');
    const hasActive = cont.classList.contains('mover');
    this.sdBrSrv.isActive$.subscribe((isActive)=>{
      if(isActive){
        this.renderer.addClass(cont, 'mover');
      }else{
        this.renderer.removeClass(cont, 'mover');
      }
    })
  }

  //Peticiones http para CRUD clientes
  //Peticion get cliente por id
  getClientsById(path: string){
    this.clSrv.get(path).subscribe({
      next:(result)=> {
        this.clientSend = result;
        console.log(result);
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }
  //Petición get
  getClients(){
    this.clSrv.get(this.path).subscribe({
      next: (result) =>{
        this.client = result;
      },
      error: (err)=> {
        console.log(err); 
      },
    })
  }  
  //Petición post
  crearClients(client: Client){
    console.log(this.clientSend);
    this.clSrv.post(this.clientSend).subscribe({
      next:(result)=>{
        Swal.fire({
          position:"center",
          icon:"success",
          title:"Cliente creado exitosamente",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          location.reload();
        })
      },
      error:(err)=> {
        console.log(err);
        Swal.fire({
          position:"center",
          icon:"error",
          title:"No se pudo crear cliente",
          showConfirmButton: false,
          timer: 1500
        })
      },
    })

  }
  //Petición para borrar un cliente
  deleteClient(){
    this.clSrv.delete(this.path).subscribe({
      next:(result) =>{
        Swal.fire({
          position:"center",
          icon:"success",
          title:"Cliente desactivado exitosamente",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          location.reload();
        })
      },
      error:(err)=> {
        console.log(err)
        Swal.fire({
          position:"center",
          icon:"error",
          title:"Hubo un problema al desactivar el cliente",
          showConfirmButton: false,
          timer: 1500
        })
      },
    })
  }
  //
  //Petición para editar un cliente
  updateClient(){
    console.log(this.clientSend);
    console.log(this.path)
    this.clSrv.update(this.path,this.clientSend).subscribe({
      next:(result)=> {
        Swal.fire({
          position:"center",
          icon:"success",
          title:"Cliente actualizado exitosamente",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          location.reload();
        })
      },
      error:(err)=> {
        Swal.fire({
          position:"center",
          icon:"error",
          title:"Hubo un problema al editar el cliente",
          showConfirmButton: false,
          timer: 1500
        })
      },
    })
  }
//Peticiones HTTP para CRUD cuentas
//Petición get cuentas
  getAccounts(){
    this.accntSrv.get(this.accPath).subscribe({
      next: (result)=> {
        this.cuentaServicio.disparadorDeCuentas.emit({
          cuentas: result,
        })
        console.log(result)
      },
      error:(err)=> {
        console.log(err);
      },
    });

  }
//Petición para crear cuienta nueva
  crearCuenta(){
    
    this.accountSend.client= this.clientSend;
    this.accntSrv.post(this.accountSend).subscribe({
      next:(result)=>{
        Swal.fire({
          position:"center",
          icon:"success",
          title:"Cuenta agregada exitosamente",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          location.reload();
        })

      },
      error:(err)=> {
        Swal.fire({
          position:"center",
          icon:"error",
          title:"Hubo un problema al crear la cuenta",
          showConfirmButton: false,
          timer: 1500
        })
      },
    })
  }

  onSelectOption(event: Event, idClient: string){
    this.path="/"+idClient;
    this.getClientsById(this.path);
    console.log(idClient);
    console.log(this.path);
  }
}

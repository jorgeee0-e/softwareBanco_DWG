import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Account, Client } from 'src/app/Interfaces/Interfaces';
import { AccountsService } from 'src/services/accounts/accounts.service';
import { ClientService } from 'src/services/client/client.service';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('cuentas') cuentas!: ElementRef;
  @ViewChild('label') label!: ElementRef;
  constructor(private sdBrSrv: SidebarStateService,
              private renderer: Renderer2,
              private clientService: ClientService,
              private accntSrv: AccountsService,
              private clSrv: ClientLenderService,
              private router: Router,
              private cuentaService: CuentaService) { }

  searchAccount: string = '';
  searchDui: string = '';
  client: Client | null = null;
  path :string = '';
  accounts: Account []=[];
  accPath: string= '';
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
  clienteA: Client []=[];
  accountSend: Account = {
    id: '',
	  type: 'Ahorro',
	  balance: 0.00,
    currency: 'Dolar',
	  client: this.client,
  }
  cuentasDeCliente: Account []=[];
  ngOnInit(): void {
    this.clientService.disparadorDeCliente.subscribe(cliente =>{
      this.clienteA.push(cliente);
      console.log("Recibiendo data cliente: ",cliente)
    });   
    console.log(this.clienteA);
    this.getAccounts();
    this.cuentaService.disparadorDeCuentas.subscribe(cuentas=>{
      console.log("Recibiendo Data: ",cuentas);
      /* if(cuentas.length>0){
        this.cuentasDeCliente =cuentas;
        console.log(this.cuentasDeCliente)
      } */
    })
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

  show(){
    this.filtrarByDui();
    const display = window.getComputedStyle(this.cuentas.nativeElement).display ;
    if(display=="block"){
      this.cuentas.nativeElement.style.display="none";
      this.label.nativeElement.textContent ="Mostrar cuentas";
    }else if(this.cuentasDeCliente.length>0){
      
      this.cuentas.nativeElement.style.display="block";
      this.label.nativeElement.textContent ="Ocultar cuentas";
    }
  }

  //Peticiones para CRUD cliente
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
  //Peticiones http para CRUD accounts
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
  crearCuenta(){
    this.accountSend.client= this.clientSend;
    console.log(this.accountSend);
    this.accntSrv.post(this.accountSend).subscribe({
      next:(value)=> {
        Swal.fire({
          position:"center",
          icon:"success",
          title:"Cuenta agregada exitosamente",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.clientService.disparadorDeCliente.emit({
            cliente: this.clientSend
          });
          console.log("emitiendo",this.clientSend);
          const cuentasFiltradas = this.filtrar(this.clientSend.dui);
          this.cuentaService.disparadorDeCuentas.emit({
            cuentas: cuentasFiltradas,
          })
          this.router.navigate(['/search']);
        }
          
        )
      },
      error:(err)=> {
        console.log(err);
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
  //Método para filtrar cuentas del cliente que se busca. 
  filtrarByDui(){
    this.cuentasDeCliente = this.accounts.filter((element:Account)=>
      element.client!= null &&element.client.dui==this.client?.dui);
    console.log(this.cuentasDeCliente)
    if(this.cuentasDeCliente.length>0){

    }else{
      Swal.fire({
        position:"center",
        icon:"error",
        title:"El cliente "+this.client?.name+" "+this.client?.lastname+" no tiene ninguna cuenta creada aún.",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  onSelectOption(event: Event, idClient: string){
    this.path="/"+idClient;
    this.getClientsById(this.path);
    console.log(idClient);
    console.log(this.path);
  }
  filtrar(dui:string){
    this.cuentasDeCliente = this.accounts.filter((element:Account)=>
      element.client!= null &&element.client.dui==dui);
    console.log(`Cuentas de ${dui}`,this.cuentasDeCliente)
    if(this.cuentasDeCliente.length>0){

    }else{
      Swal.fire({
        position:"center",
        icon:"error",
        title:"El cliente "+this.client?.name+" "+this.client?.lastname+" no tiene ninguna cuenta creada aún.",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}

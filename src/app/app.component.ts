import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Client } from './Interfaces/Interfaces';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { ClientService } from 'src/services/client/client.service';
import Swal from 'sweetalert2';
import { CuentaService } from 'src/services/cuenta/cuenta.service';
import { AccountsService } from 'src/services/accounts/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSidebarActive: boolean = false;
  isLoginPage: boolean = false;
  clerkView = true;
  bManager = true;
  gManager = true;
  user: { username: string; role: string } | null = null;

  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('bxSearch') bxSearch!: ElementRef;
  @ViewChild('buscar') buscar!: ElementRef;
  client: Client[]=[];
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
    user_id: null,
  }
  //Variable path para asignarle el path dependiendo de la peticion a hacer. 
  path :string = '';
  
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private sdBarSrv: SidebarStateService,
    private clSrv : ClientLenderService,
    private clientService: ClientService, 
    private accSrv: AccountsService,
    private cuentaServicio: CuentaService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.url === '/login' || event.url === '/register';
      });
  }
  ngOnInit( ) {
    this.clerkModuleOptions();
    this.bManagerOptions();
    this.gManagerOptions();
    this.getClients();

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  

  clerkModuleOptions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excluded = [
          '/loan-status',
          '/add-customer',
          '/req-loan',
          '/actions',
          '/search',
          '/deposit-money',
          '/withdraw-money',
          '/view-customer'
        ];
        this.clerkView = !excluded.includes(event.url);
        console.log(event.url);
      }
    });
  }
  bManagerOptions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excluded = ['/employeer-branch', '/loan-status-branch','/loan-status',];
        this.bManager = !excluded.includes(event.url);
      }
    });
  }
  gManagerOptions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excluded = [
          '/employeer-general',
          '/movements-general',
          '/branch',
        ];
        this.gManager = !excluded.includes(event.url);
      }
    });
  }
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  toggleChange() {
    const sidebar = this.btn.nativeElement.closest('.sidebar');
    const hasActive = sidebar.classList.contains('active');
    if (hasActive) {
      this.renderer.removeClass(sidebar, 'active');
      console.log('click');
    } else {
      this.renderer.addClass(sidebar, 'active');
      console.log('click');
    }

    this.sdBarSrv.toogleSideBar();
  }
  search() {
    this.buscar.nativeElement.value = '';
    this.router.navigate(['/search']);
    this.toggleChange();
  }
  getClients(){
    this.clSrv.get(this.path).subscribe({
      next: (result) =>{
        this.client = result;
        console.log(result);
      },
      error(err) {
        console.log(err); 
      },
    })
  }
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
  getClientByDui(dui: string):void{
    console.log("dui: ",dui);
    console.log(dui.length);
    console.log(dui.trim().length==0);
    if(dui.trim().length==0){
      Swal.fire({
        position:"center",
        icon:"warning",
        title:"Debe ingresar un dui para buscar",
        showConfirmButton: false,
        timer: 1500
      })
    }else { 
      
    const cliente:Client|null = this.client.filter((element:Client)=> element.dui==dui)[0];

    if(cliente){
      console.log(cliente);
      this.clientService.setClient(cliente);
      this.router.navigate(['/search']);
    } else {
      Swal.fire({
        position:"center",
        icon:"error",
        title:"Cliente no encontrado",
        showConfirmButton: false,
        timer: 1500
      })
    }
    console.log("Filtrado: ", cliente);
    }
  }

  logout() {
    // Eliminar los datos del usuario y el token del almacenamiento local
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    if (!this.user || !this.user.role) {
      return false;
    }
    return this.user.role.includes(role);
  }
  
}

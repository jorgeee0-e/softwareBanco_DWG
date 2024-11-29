import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Client } from 'src/app/Interfaces/Interfaces';
import { ClientService } from 'src/services/client/client.service';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-req-loan',
  templateUrl: './req-loan.component.html',
  styleUrls: ['./req-loan.component.css']
})
export class ReqLoanComponent implements OnInit {

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
    user_id: null,
  }
  clientId: string = '';
  loanTerm: string = '';

  @ViewChild('content') content!: ElementRef;
  constructor(private renderer: Renderer2, 
              private sdBrSrv: SidebarStateService,
              private clientService: ClientService,
              private clSrv: ClientLenderService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.clientId="/"+params.get('id')|| '';
      console.log("Id del cliente", this.clientId)
      });
      this.getClientById();
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

  getClientById(){
    this.clSrv.get(this.clientId).subscribe({
      next:(value)=> {
        this.client = value;
        console.log(this.clientId);
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }

  onLoanChange(event: Event){
    const selectedValue = (event.target as HTMLSelectElement).value
    console.log(selectedValue);

  }

}

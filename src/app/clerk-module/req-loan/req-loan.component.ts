import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ClientService } from 'src/services/client/client.service';
import { ClientLenderService } from 'src/services/client_lender/client-lender.service';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-req-loan',
  templateUrl: './req-loan.component.html',
  styleUrls: ['./req-loan.component.css']
})
export class ReqLoanComponent implements OnInit {

  @ViewChild('content') content!: ElementRef;
  constructor(private renderer: Renderer2, 
              private sdBrSrv: SidebarStateService,
              private clientService: ClientService,
              private clSrv: ClientLenderService) { }

  ngOnInit() {
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

}

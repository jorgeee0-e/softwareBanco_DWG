import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {

  constructor( private renderer: Renderer2, private sdBrSrv: SidebarStateService ) { }
  @ViewChild('content') content!:ElementRef;

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

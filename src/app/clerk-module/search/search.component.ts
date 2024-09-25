import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('cuentas') cuentas!: ElementRef;
  @ViewChild('label') label!: ElementRef;
  constructor(private sdBrSrv: SidebarStateService, private renderer: Renderer2) { }

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

  show(){
    const display = window.getComputedStyle(this.cuentas.nativeElement).display ;
    if(display=="block"){
      this.cuentas.nativeElement.style.display="none";
      this.label.nativeElement.textContent ="Mostrar cuentas";
    }else{
      this.cuentas.nativeElement.style.display="block";
      this.label.nativeElement.textContent ="Ocultar cuentas";
    }
  }

}

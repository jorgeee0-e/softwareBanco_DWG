import { Component, ElementRef, OnInit, ViewChild, NgModule, Renderer2 } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-employeer-branch',
  templateUrl: './employeer.component.html',
  styleUrls: ['./employeer.component.css']
})
export class EmployeerBranchComponent implements OnInit {

  @ViewChild('delete') delete!: ElementRef;
  constructor(  private renderer: Renderer2, 
                private sdBrSrv: SidebarStateService) { }
  @ViewChild('dropd') dropd!:ElementRef;
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


  updateButtonText(text: string){
    this.dropd.nativeElement.textContent=text;
  }

  checker(){
   console.log("click")
  }

}

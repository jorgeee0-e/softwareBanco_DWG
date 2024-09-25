import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('bxSearch') bxSearch!: ElementRef;
  @ViewChild('buscar') buscar!: ElementRef;
  constructor(private renderer: Renderer2, private router: Router, private sdBarSrv: SidebarStateService) {}

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
  search(){
    this.buscar.nativeElement.value ="";
    this.router.navigate(['/search']);
    this.toggleChange();
    

  }
}

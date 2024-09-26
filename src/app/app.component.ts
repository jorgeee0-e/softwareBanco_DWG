import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('bxSearch') bxSearch!: ElementRef;
  @ViewChild('buscar') buscar!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private sdBarSrv: SidebarStateService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoginPage = event.url === '/login' || event.url === '/register';
      });
  }
  ngOnInit() {
    this.clerkModuleOptions();
    this.bManagerOptions();
    this.gManagerOptions();
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
        ];
        this.clerkView = !excluded.includes(event.url);
        console.log(event.url);
      }
    });
  }
  bManagerOptions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excluded = ['/employeer-branch', '/loan-status-branch'];
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
}

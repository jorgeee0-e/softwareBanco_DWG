import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { SidebarStateService } from 'src/sidebar-state/sidebar-state.service';

@Directive({
  selector: '[appmover]',
})
export class MoverDirectiva implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private sdBrSrv: SidebarStateService,
    private content: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.resize();
  }

  resize() {
    const cont = this.content.nativeElement.closest('.home_content');
    this.sdBrSrv.isActive$.subscribe((isActive) => {
      if (isActive) {
        this.renderer.addClass(cont, 'mover');
      } else {
        this.renderer.removeClass(cont, 'mover');
      }
    });
  }
}

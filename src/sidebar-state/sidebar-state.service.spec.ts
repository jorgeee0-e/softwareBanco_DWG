/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidebarStateService } from './sidebar-state.service';

describe('Service: SidebarState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarStateService]
    });
  });

  it('should ...', inject([SidebarStateService], (service: SidebarStateService) => {
    expect(service).toBeTruthy();
  }));
});

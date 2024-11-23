/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientLenderService } from './client-lender.service';

describe('Service: ClientLender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientLenderService]
    });
  });

  it('should ...', inject([ClientLenderService], (service: ClientLenderService) => {
    expect(service).toBeTruthy();
  }));
});

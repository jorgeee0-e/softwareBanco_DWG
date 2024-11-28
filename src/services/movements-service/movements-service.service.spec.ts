/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovementsServiceService } from './movements-service.service';

describe('Service: MovementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementsServiceService]
    });
  });

  it('should ...', inject([MovementsServiceService], (service: MovementsServiceService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoanStatusBranchComponent } from './loan-status.component';

describe('LoanStatusBranchComponent', () => {
  let component: LoanStatusBranchComponent;
  let fixture: ComponentFixture<LoanStatusBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanStatusBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanStatusBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

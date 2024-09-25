import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReqLoanComponent } from './clerk-module/req-loan/req-loan.component';
import { LoanStatusComponent } from './clerk-module/loan-status/loan-status.component';
import { ClerkSummaryComponent } from './clerk-module/clerk-summary/clerk-summary.component';
import { AddCustomerComponent } from './clerk-module/add-customer/add-customer.component';
import { ActionsComponent } from './clerk-module/actions/actions.component';
import { EmployeerGeneralComponent } from './general-managment-module/employeer/employeer.component';
import { EmployeerBranchComponent } from './branch-managment-module/employeer/employeer.component';
import { BranchComponent } from './general-managment-module/branch/branch.component';
import { LoanStatusBranchComponent } from './branch-managment-module/loan-status/loan-status.component';
import { MovementsComponent } from './general-managment-module/movements/movements.component';

const routes: Routes = [
  {path:'',redirectTo:'clerk-summary', pathMatch: 'full'},
  {path:'clerk-summary', component: ClerkSummaryComponent},
  {path: 'add-customer', component: AddCustomerComponent},
  {path:'req-loan', component:ReqLoanComponent},
  {path:'loan-status', component: LoanStatusComponent},
  {path:'actions', component:ActionsComponent},
  {path:'branch', component:BranchComponent},
  {path:'employeer-general', component:EmployeerGeneralComponent},
  {path:'employeer-branch', component:EmployeerBranchComponent},
  {path:'loan-status-branch', component:LoanStatusBranchComponent},
  {path:'movements-general', component:MovementsComponent}


]
  

@NgModule({
  declarations: [				
      AppComponent,
      AddCustomerComponent,
      ReqLoanComponent,
      LoanStatusComponent,
      ClerkSummaryComponent,
      BranchComponent,
      EmployeerBranchComponent,
      EmployeerGeneralComponent,
      LoanStatusBranchComponent,
      MovementsComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

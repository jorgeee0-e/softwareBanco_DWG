import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReqLoanComponent } from './clerk-module/req-loan/req-loan.component';
import { LoanStatusComponent } from './clerk-module/loan-status/loan-status.component';
import { ClerkSummaryComponent } from './clerk-module/clerk-summary/clerk-summary.component';
import { AddCustomerComponent } from './clerk-module/add-customer/add-customer.component';
import { ActionsComponent } from './clerk-module/actions/actions.component';

const routes: Routes = [
  {path:'',redirectTo:'clerk-summary', pathMatch: 'full'},
  {path:'clerk-summary', component: ClerkSummaryComponent},
  {path: 'add-customer', component: AddCustomerComponent},
  {path:'req-loan', component:ReqLoanComponent},
  {path:'loan-status', component: LoanStatusComponent},
  {path:'actions', component:ActionsComponent}
]
  

@NgModule({
  declarations: [				
    AppComponent,
    AddCustomerComponent,
      ReqLoanComponent,
      LoanStatusComponent,
      ClerkSummaryComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

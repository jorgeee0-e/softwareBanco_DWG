import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReqLoanComponent } from './clerk-module/req-loan/req-loan.component';
import { LoanStatusComponent } from './clerk-module/loan-status/loan-status.component';
import { ClerkSummaryComponent } from './clerk-module/clerk-summary/clerk-summary.component';
import { AddCustomerComponent } from './clerk-module/add-customer/add-customer.component';
import { ActionsComponent } from './clerk-module/actions/actions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddAccountComponent } from './clerk-module/add-account/add-account.component';
import { ViewCustomerComponent } from './clerk-module/view-customer/view-customer.component';
import { SearchComponent } from './clerk-module/search/search.component';
import { MovementsComponent } from './general-managment-module/movements/movements.component';
import { BranchComponent } from './general-managment-module/branch/branch.component';
import { EmployeerBranchComponent } from './branch-managment-module/employeer/employeer.component';
import { EmployeerGeneralComponent } from './general-managment-module/employeer/employeer.component';
import { LoanStatusBranchComponent } from './branch-managment-module/loan-status/loan-status.component';

const routes: Routes = [
  { path: 'clerk-summary', component: ClerkSummaryComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'req-loan', component: ReqLoanComponent },
  { path: 'loan-status', component: LoanStatusComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: 'view-customer', component: ViewCustomerComponent },
  { path: 'movements-general',component: MovementsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'search',component: SearchComponent},
  { path: 'branch', component: BranchComponent},
  { path:'employeer-branch', component: EmployeerBranchComponent},
  { path: 'employeer-general', component: EmployeerGeneralComponent},
  { path: 'loan-status-branch', component: LoanStatusBranchComponent}

]
  

@NgModule({
  declarations: [				
    AppComponent,
    AddCustomerComponent,
    ReqLoanComponent,
    LoanStatusComponent,
    SearchComponent,
    ClerkSummaryComponent,
    LoginComponent,
    RegisterComponent,
    ActionsComponent,
    AddAccountComponent,
    ViewCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
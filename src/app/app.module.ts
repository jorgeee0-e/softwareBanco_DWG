import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DepositMoneyComponent } from './clerk-module/deposit-money/deposit-money.component';
import { WithdrawMoneyComponent } from './clerk-module/withdraw-money/withdraw-money.component';
import { SearchComponent } from './clerk-module/search/search.component';
import { MovementsComponent } from './general-managment-module/movements/movements.component';
import { BranchComponent } from './general-managment-module/branch/branch.component';
import { EmployeerBranchComponent } from './branch-managment-module/employeer/employeer.component';
import { EmployeerGeneralComponent } from './general-managment-module/employeer/employeer.component';
import { LoanStatusBranchComponent } from './branch-managment-module/loan-status/loan-status.component';
import { MoverDirectiva } from './directives/mover.directive';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ClientService } from 'src/services/client/client.service';
import { ClientAccountsComponent } from './clerk-module/client-accounts/client-accounts.component';

const routes: Routes = [
  { path: 'clerk-summary', component: ClerkSummaryComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'req-loan/:id', component: ReqLoanComponent },
  { path: 'loan-status', component: LoanStatusComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-account', component: AddAccountComponent },
  { path: 'view-customer', component: ViewCustomerComponent },
  { path: 'view-customer/:id', component: ViewCustomerComponent },
  { path: 'deposit-money', component: DepositMoneyComponent },
  { path: 'withdraw-money', component: WithdrawMoneyComponent },
  { path: 'movements-general', component: MovementsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'employeer-branch', component: EmployeerBranchComponent },
  { path: 'employeer-general', component: EmployeerGeneralComponent },
  { path: 'loan-status-branch', component: LoanStatusBranchComponent },
  { path: 'client-accounts', component: ClientAccountsComponent },
];

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
    ViewCustomerComponent,
    DepositMoneyComponent,
    WithdrawMoneyComponent,
    ClientAccountsComponent
  ],
  imports: [CommonModule,ReactiveFormsModule, BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    ClientService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

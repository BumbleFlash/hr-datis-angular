import {Routes, RouterModule} from '@angular/router';

import {EmployeeComponent} from './employee/employee.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './helpers/AuthGuard';
import {InformationComponent} from './information/information.component';

const routes: Routes = [
  {path: '', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add', component: InformationComponent},
  {path: 'update', component: InformationComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);

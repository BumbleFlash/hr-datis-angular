import {Routes, RouterModule} from '@angular/router';

import {EmployeeComponent} from './employee/employee.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './helpers/AuthGuard';
import {InformationComponent} from './information/information.component';

/**
 * The routes array contains all the paths and mapped to its corresponding components. This
 * is how angular router knows which route and component to display.
 */
const routes: Routes = [
  {path: '', component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add', component: InformationComponent},
  {path: 'update', component: InformationComponent},

  // Redirect to home if the path is invalid.
  {path: '**', redirectTo: ''}
];

/**
 * This creates a routing module with all of the routes above. Includes all providers or directives
 * like <router-outlet>
 */
export const appRoutingModule = RouterModule.forRoot(routes);

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {appRoutingModule} from './app.routing';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {EmployeeComponent} from './employee/employee.component';
import {AlertComponent} from './alert/alert.component';
import {InformationComponent} from './information/information.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeComponent,
    AlertComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

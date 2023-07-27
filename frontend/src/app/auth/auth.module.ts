import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AuthRoutingModule} from './auth-routing.module';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';
import { UserService } from './user.service';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import {HttpClientModule} from '@angular/common/http';
import { ChangePasswordService } from './change-password.service';


@NgModule({
  declarations: [RegisterComponent,LoginComponent,ChangePasswordComponent,],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[AuthService,UserService,ChangePasswordService
  ]
})
export class AuthModule { }

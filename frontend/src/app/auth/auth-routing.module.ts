import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { registerLocaleData } from '@angular/common';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';

const routes: Routes = [
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
    {path: 'admin-page',component:AdminPageComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
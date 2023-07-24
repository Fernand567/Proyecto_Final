import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { registerLocaleData } from '@angular/common';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { OperatorPageComponent } from '../components/operator-page/operator-page.component';

const routes: Routes = [
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
    {path: 'admin-page',component:AdminPageComponent},
    { path: 'edit-user/:userId', component: EditUserComponent },
    {path: 'operator-page',component: OperatorPageComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
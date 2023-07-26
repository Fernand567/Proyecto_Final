import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//componentes
import { HomeComponent } from './components/home/home.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { OperatorPageComponent } from './components/operator-page/operator-page.component';


const routes: Routes = [

  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path:'',component:HomeComponent},
  {path: 'home',component:HomeComponent},
  {path: 'informacion',component:InformacionComponent},
  {path: 'servicios',component:ServiciosComponent},
  {path: 'operator-page',component:OperatorPageComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

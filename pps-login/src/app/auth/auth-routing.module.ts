import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticateGuard } from './guard/authenticate.guard';
import { NoAuthenticateGuard } from './guard/no-authenticate.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[NoAuthenticateGuard]},
  {path:'register', component: RegisterComponent, canActivate:[NoAuthenticateGuard]},
  //{path:'', component:HomeComponent, canActivate:[AuthenticateGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

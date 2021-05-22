import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"splash", component:SplashComponent},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"", redirectTo:"splash", pathMatch:"full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

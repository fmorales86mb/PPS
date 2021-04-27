import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthenticateGuard } from './auth/guard/authenticate.guard';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  {path:"", component:HomeComponent, pathMatch:"full", canActivate:[AuthenticateGuard]},
  {path:"home", component:HomeComponent, pathMatch:"full", canActivate:[AuthenticateGuard]},
  {path:"splash", component:SplashComponent, pathMatch:"full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthenticateGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    //console.log(this.authService.GetIsAuth());
    // if (this.authService.GetIsAuth()) {
    //   this.router.navigate(['/']);
    // }
    //return !this.authService.GetIsAuth();
    let ok = true;
    if(CurrentUser.isAuth){      
      ok = false;
      this.router.navigate(['']);
    }

    return ok;    
  }
  
}

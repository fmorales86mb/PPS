import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth:boolean = false;    
    if (this.authService.GetIsAuth()) {
      isAuth = true;
    }
    else{      
      isAuth = false; // sólo pruebas
      this.router.navigate(['/login']);
    }

    return isAuth;
  }
  
}

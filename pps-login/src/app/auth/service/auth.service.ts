import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CurrentUser } from '../models/current-user';
import { LoginData } from '../models/loginData';
import { RegisterData } from '../models/registerData';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private userId: any;
  private static isAuth:boolean;

  constructor(private authDb: AngularFireAuth) {
      AuthService.isAuth= false;
      this.userId = null;
  }

  public async Ingresar(loginData: LoginData): Promise<boolean>{  
    //AuthService.isAuth = await this.Authenticate(loginData);     
    //console.log(AuthService.isAuth);        
    //return AuthService.isAuth;
    let ok = await this.Authenticate(loginData);
    console.log(ok);
    CurrentUser.isAuth = ok;
    return CurrentUser.isAuth;
  }

  public async Registrarse(registerData: RegisterData):Promise<boolean>{
    await this.authDb.createUserWithEmailAndPassword(registerData.loginData.email, registerData.loginData.pass)
      .then((userCredential) => {
        this.userId = userCredential.user?.uid;
        AuthService.isAuth=true;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);     
      });

    return AuthService.isAuth;
  }

  public Desloguearse(){    
    this.authDb.signOut();
    AuthService.isAuth = false;
  }

  public GetUserId(){
    return this.userId;
  }

  public GetIsAuth():boolean{
    //return AuthService.isAuth;
    return CurrentUser.isAuth;
  }

  private async Authenticate(loginData: LoginData): Promise<boolean>{    
    let isAuth:boolean = false;

    await this.authDb.signInWithEmailAndPassword(loginData.email, loginData.pass)
    .then((userCredential) => {
      // Signed in      
      this.userId = userCredential.user?.uid;
      isAuth = true;
      //console.log("service: ", userCredential.user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);          
    });

    return isAuth;
  }
}
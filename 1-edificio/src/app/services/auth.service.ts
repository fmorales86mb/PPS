import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Rol } from '../models/enums/rol-enum';
import { ErrorHandleFirebase } from '../models/errors-handle';
import { LoginData } from '../models/loginData';
import { RegisterData } from '../models/registerData';
import { ResponseFirebase } from '../models/response-firebase';
import { User } from '../models/user';
import { IUserInfo } from '../models/user-info';
import { UserInfoService } from './user-info.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth:boolean = false;
  private currentUser: User = new User;
  currentUserInfo:IUserInfo;

  constructor(private authDb: AngularFireAuth, 
    private router:Router, 
    private userService:UserService,
    private userInfoService:UserInfoService) { 
  
    }

  public async Registrarse(registerData: RegisterData):Promise<ResponseFirebase>{
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.createUserWithEmailAndPassword(registerData.loginData.email, registerData.loginData.pass)
      .then((userCredential) => {        
        this.isAuth = true;
        response.ok = true;
      })
      .catch((error) => {        
        this.isAuth = false;
        let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
        response.ok = false;
        response.error = errorFirebase;      
      });

    if(response.ok){
      this.currentUser.email = registerData.loginData.email;
      this.currentUser.nombre = registerData.nombre;
      this.currentUser.rol = Rol.Usuario;
      
      await this.userService.addItem(this.currentUser).catch((err)=>{
        console.log(err);
        this.Desloguearse();
      })

      this.currentUserInfo = {
        id:"",
        user:{
          name:registerData.nombre,
          email:registerData.loginData.email
        },
        vote1:{
          isVote:false,
          photoName:"",
          photoUrl:""
        },
        vote2:{
          isVote:false,
          photoName:"",
          photoUrl:""
        }
      }

      await this.userInfoService.addItem(this.currentUserInfo).catch((err)=>{
        console.log(err);
        this.Desloguearse();
      })
    }

    return response;
  }

  public async Ingresar(loginData: LoginData): Promise<ResponseFirebase>{  
    let response:ResponseFirebase = new ResponseFirebase();

    await this.authDb.signInWithEmailAndPassword(loginData.email, loginData.pass)
    .then((userCredential) => {                 
      this.isAuth = true;
      response.ok = true;      
    })
    .catch((error) => {
      this.isAuth = false;
      let errorFirebase = ErrorHandleFirebase.getErrorByCode(error.code);           
      response.ok = false;
      response.error = errorFirebase;          
    })
    .finally(()=>{

    });
          
    if(response.ok){
      await this.userService.getUserByEmail(loginData.email).then((qs) =>{
        if(qs.size === 1){
          this.currentUser = qs.docs[0].data();
        }
      });

      await this.userInfoService.getItemByFilter("user.email", loginData.email).then((qs) =>{
        if(qs.size === 1){
          this.currentUserInfo = qs.docs[0].data();
          this.currentUserInfo.id = qs.docs[0].id;
          console.log(this.currentUserInfo);
        }
      });
    } 
    

    return response;
  }

  public Desloguearse(){    
    this.isAuth = false;
    this.currentUser = new User();
    this.router.navigate(["login"]);
  }

  public GetIsAuth():boolean{    
    return this.isAuth;
  }

  public GetCurrentUser():User{
    return this.currentUser;
  }
}

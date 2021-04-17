import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterData } from '../../models/registerData';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerData: RegisterData;

  constructor(
    private authService:AuthService, 
    public toastController:ToastController,
    private router:Router) { 
      this.registerData = new RegisterData();
    }

  async registrarseClick(){
    //console.log(this.registerData, this.name.errors);
    // if(await this.authService.Registrarse(this.registerData)){
    //   console.log("OK registro");
    // }
    // else{
    //   console.log("error");
    // }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'warning',
      message: 'Error al ingresar datos.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   name: new FormControl(this.registerData.nombre, [
    //     Validators.required,
    //     Validators.minLength(2)        
    //   ]),
    //   email: new FormControl(this.registerData.loginData.email, [
    //     Validators.required,
    //     Validators.email
    //   ]),
    //   pass: new FormControl(this.registerData.loginData.pass, [
    //     Validators.required,
    //     Validators.minLength(6)
    //   ]),
    //   // genere: new FormControl(this.registerData.genero, 
    //   //   [Validators.required
    //   // ])
    // });

    
      // this.name= new FormControl(this.registerData.nombre, [
      //   //Validators.required,
      //   Validators.minLength(2)        
      // ]);
      // this.email= new FormControl(this.registerData.loginData.email, [
      //   Validators.required,
      //   Validators.email
      // ]);
      // this.pass= new FormControl(this.registerData.loginData.pass, [
      //   Validators.required,
      //   Validators.minLength(6)
      // ]);
    
  }

}

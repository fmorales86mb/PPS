import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterData } from '../../models/registerData';
import { AuthService } from '../../service/auth.service';

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

  registrarseClick(){
    console.log()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'warning',
      message: 'Error al ingresar datos.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {}

}

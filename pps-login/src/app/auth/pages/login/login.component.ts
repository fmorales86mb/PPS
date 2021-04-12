import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoginData } from '../../models/loginData';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  private loginData:LoginData;

  constructor(
    public toastController: ToastController,
    private authService: AuthService) { 
      this.loginData = new LoginData();
  }

  async clickLogin(){
    console.log(await this.authService.Ingresar(this.loginData));
    await this.presentToast();
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginMock } from '../../models/login-mock';
import { LoginData } from '../../models/loginData';
import { RegisterData } from '../../models/registerData';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  private loginData:LoginData;
  private selectedMock:LoginData;
  private loginsMock:LoginData[]= [
    { email:"admin@admin.com", pass:"111111" },
    { email:"invitado@invitado.com", pass:"222222" },
    { email:"usuario@usuario.com", pass:"333333" },
    { email:"anonimo@anonimo.com", pass:"444444" },
    { email: "tester@tester.com", pass:"555555" }
  ];

  constructor(
    public toastController: ToastController,
    private authService: AuthService,
    private router: Router) { 
      this.loginData = new LoginData();
      //this.loginsMock = LoginMock.Mocks;
  }

  async clickLogin(){
    if (await this.authService.Ingresar(this.loginData)){
      console.log("entra");
      this.router.navigate(['']);
    }
    else{
      await this.presentToast();
    }    
  }

  async presentToast(){
    const toast = await this.toastController.create({
      color: 'warning',
      message: 'Error al ingresar datos.',
      duration: 2000
    });
    toast.present();
  }

  onChange(event){
    //console.log(event.target.value.email);
    //console.log(this.selectedMock);
  }

  ngOnInit() {
  }

}

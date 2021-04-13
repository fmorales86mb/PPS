import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  public users:RegisterData[];
  

  constructor(
    public toastController: ToastController,
    private authService: AuthService) { 
      this.loginData = new LoginData();
      this.users = new Array();
  }

  async clickLogin(){
    console.log(await this.authService.Ingresar(this.loginData));
    await this.presentToast();
  }

  async presentToast(){
    const toast = await this.toastController.create({
      color: 'warning',
      message: 'Error al ingresar datos.',
      duration: 2000
    });
    toast.present();
  }

  private loadUsers():void{
    let test: RegisterData = new RegisterData();
    let admin: RegisterData= new RegisterData();
    let invitado: RegisterData= new RegisterData();
    let anonimo: RegisterData= new RegisterData();
    let usuario: RegisterData= new RegisterData();

    admin.rol="admin";
    admin.loginData.email= "admin@admin.com";
    admin.loginData.pass = "111111";

    invitado.rol="invitado";
    invitado.loginData.email= "invitado@invitado.com";
    invitado.loginData.pass = "222222";

    usuario.rol="usuario";
    usuario.loginData.email= "usuario@usuario.com";
    usuario.loginData.pass = "333333";

    anonimo.rol="usuario";
    anonimo.loginData.email= "anonimo@anonimo.com";
    anonimo.loginData.pass = "444444";

    test.rol="tester";
    test.loginData.email = "tester@tester.com";
    test.loginData.pass = "555555";

    this.users.push(admin);
    this.users.push(invitado);
    this.users.push(usuario);
    this.users.push(anonimo);
    this.users.push(test);
  }

  ngOnInit() {
    this.loadUsers();
  }

}

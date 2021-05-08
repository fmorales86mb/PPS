import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginMock } from '../../models/login-mock';
import { LoginData } from '../../models/loginData';
import { RegisterData } from '../../models/registerData';
import { ResponseFirebase } from '../../models/response-firebase';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  private showErrors:boolean;
  private loginData:LoginData;
  private loginForm:FormGroup;
  private loginsMock:LoginData[];

  constructor(
    public toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.loginData = new LoginData();
      this.loginForm = this.createForm();
      this.showErrors = false;
      this.loginsMock = LoginMock.Mocks;
  }

  clickLogin(){    
    this.showErrors = true;
    if(this.loginForm.valid){       
      this.authService.Ingresar(this.loginData)
      .then((value)=>{
        if (value.ok){      
          this.router.navigate(['']);
        }
        else{
          this.presentToast(value.error.description);
       }
      });            
    }        
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      color: 'warning',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onChange(event){  }

  createForm() {
    return this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  getEmailControl() { return this.loginForm.controls["email"]; }

  getPassControl() { return this.loginForm.controls["pass"]; }

  goToRegister() {this.router.navigate(['register']); }

  ngOnInit() {
  }

}

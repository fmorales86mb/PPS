import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterData } from '../../models/registerData';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerData: RegisterData;
  passConfirmation: string;
  private registerForm:FormGroup;
  private showErrors: boolean;

  constructor(
    private authService:AuthService, 
    public toastController:ToastController,
    private router:Router,
    private formBuilder: FormBuilder) { 
      this.registerData = new RegisterData();
      this.createForm();
      this.showErrors = false;
    }

  async registrarseClick(){
    this.showErrors = true;
    console.log(this.registerForm.valid);
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

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass1: ["", [Validators.required, Validators.minLength(6)]],
      name: ["", [Validators.required, Validators.minLength(2)]],
      genero: ["", [Validators.required]],
      pass2: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  getEmailControl() { return this.registerForm.controls["email"]; }
  getPass1Control() { return this.registerForm.controls["pass1"]; }
  getNameControl() { return this.registerForm.controls["name"]; }
  getGeneroControl() { return this.registerForm.controls["genero"]; }
  getPass2Control() { return this.registerForm.controls["pass2"]; }

  goToLogin(){ this.router.navigate(['login']) }

  ngOnInit() {
    
  }

}

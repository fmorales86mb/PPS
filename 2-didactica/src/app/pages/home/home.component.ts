import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  userEmail:string;  
  userName:string;  
  espania:string =  "../../../assets/bandera-gallegos.png";
  pirata:string =  "../../../assets/bandera-pirata.png";
  portugal:string =  "../../../assets/bandera-portugal.png";
  animales:string =  "../../../assets/animales.jpg";
  colores:string =  "../../../assets/colores.jpeg";
  numeros:string =  "../../../assets/numeros.jpg";

  constructor(public toastController: ToastController,
    private authService:AuthService) {    
      
  }

  ngOnInit() {
    this.userEmail = this.authService.GetCurrentUser().email;
    this.userName = this.authService.GetCurrentUser().nombre;
  }

  clickLogout(){
    this.authService.Desloguearse();
  }

}

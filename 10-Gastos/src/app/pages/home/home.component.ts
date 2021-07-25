import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from 'src/app/models/user';
// import { AuthService } from 'src/app/services/auth.service';
// import { SpinnerService } from 'src/app/services/spinner.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  meses:string[];  
  customPickerOptions: any;  

  constructor(    
    ) 
  { 
    this.setMeses();
    this.customPickerOptions = {
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          return false;
        }
      },{
        text: 'Aceptar',
        handler: () => {
          return true;
        }
      }]
    }
  }    

  ngOnInit() {
    // this.spinner.show();
    // this.currentUser = this.authService.GetCurrentUser();

    // this.userService.items.subscribe((items)=>{
    //   this.users = items;
    //   //console.log(this.users);
    //   this.spinner.hide();
    // });
  }

  logout(){
   // this.authService.Desloguearse();
  }

  private setMeses(){
    this.meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]; 
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  credito:string;

  constructor(private authService:AuthService) {
    this.credito = "333";
  }

  ngOnInit() {

  }

  clickCargar(){

  }

  clickLogout(){
    this.authService.Desloguearse();
  }

  clickLimpiar(){

  }

}

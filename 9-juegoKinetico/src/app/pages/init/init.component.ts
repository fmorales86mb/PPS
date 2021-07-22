import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit {

  logos:string[];

  constructor(private router:Router,
    private authService:AuthService) { 
    this.logos = [
      "assets/batman.png",
      "assets/capitanamerica.png",
      "assets/spiderman.png",
      "assets/superman.png",
    ]
  }

  ngOnInit() {}

  seleccionarPersonaje(index:number):void {
    this.router.navigate(['game', {logo: this.logos[index]}])
  }

  logout(){
    this.authService.Desloguearse();
  }

}

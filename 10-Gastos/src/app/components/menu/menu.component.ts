import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private authService:AuthService,
    private menu: MenuController) { }

  ngOnInit() {}

  logout(){
    this.menu.close('custom');
    this.authService.Desloguearse();
  }
}

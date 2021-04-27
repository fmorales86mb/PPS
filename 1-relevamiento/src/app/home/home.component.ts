import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../auth/models/current-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("isAuth: ", CurrentUser.isAuth)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  users:User[];
  currentUser:User;

  constructor(
    private router:Router,
    private spinner:SpinnerService,
    private userService:UserService,
    private authService:AuthService
    ) { 
      this.users = [];
    }

  ngOnInit() {
    this.spinner.show();
    this.currentUser = this.authService.GetCurrentUser();

    this.userService.items.subscribe((items)=>{
      this.users = items;
      console.log(this.users);
      this.spinner.hide();
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  }

  logout(){
    this.authService.Desloguearse();
  }
}

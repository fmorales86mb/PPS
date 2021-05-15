import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoData } from 'src/app/models/photoData';
import { IUserInfo } from 'src/app/models/user-info';
import { AuthService } from 'src/app/services/auth.service';
import { PhotosDataService } from 'src/app/services/photos-data.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {

  listaItems:PhotoData[];
  canVote1:boolean;
  canVote2:boolean;
  userInfo:IUserInfo;
  hasFilter:boolean;
  
  constructor(private authService:AuthService,
    private router:Router,
    private dataService:PhotosDataService,
    private userInfoService:UserInfoService) {
      this.listaItems = [];
      this.hasFilter = false;
  }

  ngOnInit() {
    this.dataService.items.subscribe((items) =>{
      this.listaItems = items;
    });

    this.userInfo = this.authService.currentUserInfo;

    this.canVote1 = !this.userInfo.vote1.isVote;
    this.canVote2 = !this.userInfo.vote2.isVote;
  }

  clickLogout(){
    this.authService.Desloguearse();
  }
  
  goToHome(){
    this.router.navigate(['home']);
  }

  clickVote(photo:PhotoData){
    if(photo.type){
      this.userInfo.vote1.isVote = true;
      this.userInfo.vote1.photoName = photo.photoName;
      this.userInfo.vote1.photoUrl = photo.photoUrl;
      this.canVote1 = false;
    }else{
      this.userInfo.vote2.isVote = true;
      this.userInfo.vote2.photoName = photo.photoName;
      this.userInfo.vote2.photoUrl = photo.photoUrl;
      this.canVote2 = false;
    }

    this.userInfoService.setItemWithId(this.userInfo, this.userInfo.id);
  }

  clickFilter(){
    console.log("filter");
    this.hasFilter = !this.hasFilter;
    this.dataService.toogleFilter(this.hasFilter, this.userInfo.user.email);
    this.dataService.items.subscribe((items) =>{
      this.listaItems = items;
    });
  }
}

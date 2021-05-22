import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PhotoData } from '../models/photoData';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosDataService extends BaseService<PhotoData>{

  constructor(private fire:AngularFirestore) {
    super(fire);
    this.setCollectionOrderBy("PhotosData", "date");
  }

  toogleFilter(filter:boolean, userEmail:string){
    if(filter){
      this.setCollFilter(userEmail, "PhotosData", "date", "userEmail");
    }else{
      this.setCollectionOrderBy("PhotosData", "date");
    }
  }
}

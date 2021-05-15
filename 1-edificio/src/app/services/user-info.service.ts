import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  protected itemsCollection: AngularFirestoreCollection<IUserInfo>;
  items: Observable<IUserInfo[]>; 
  
  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<IUserInfo>("user-info");
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(item: IUserInfo) {
    return this.itemsCollection.add(Object.assign({}, item));    
  }

  getItemByFilter(campo:string, value:any){
    return this.itemsCollection.ref.where(campo,'==',value).get();
  }

  setItemWithId(item: IUserInfo, id:string) {
    this.itemsCollection.doc(id).set(Object.assign({}, item));    
  }
}

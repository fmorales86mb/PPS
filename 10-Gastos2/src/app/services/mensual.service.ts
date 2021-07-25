import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistroMensual } from '../models/resgistro-mensual';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MensualService extends BaseService<RegistroMensual> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollectionOrderBy2("gasto", "anio", "mes");
  }  

  getRegistrosByUser(uid:string){
    return super.getItemByFilter("uid", uid);
  }
}
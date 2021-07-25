import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Gasto } from '../models/gasto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService extends BaseService<Gasto> {

  constructor(private fire:AngularFirestore) { 
    super(fire);
    this.setCollection("gastos");
  }  
}

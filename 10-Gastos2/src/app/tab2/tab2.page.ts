import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../models/enums/categorias';
import { ToastType } from '../models/enums/toastType-enum';
import { Gasto } from '../models/gasto';
import { AuthService } from '../services/auth.service';
import { GastoService } from '../services/gasto.service';
import { MensualService } from '../services/mensual.service';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  uid:string;  
  registroMes:any;
  resto:number;
  Form:FormGroup;  
  gasto:Gasto;
  chipsDisabled:boolean[];
  selectedChip:number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private mensualService:MensualService,
    private toast:ToastService,
    private spinner:SpinnerService,
    private gastoService:GastoService
  ) {    
    this.gasto = new Gasto();
    this.initChip();
  }

  ngOnInit(): void {
    this.spinner.show();    
    this.uid = this.authService.GetCurrentUid();  
    
    this.mensualService.items.subscribe((items) => {      
      const myItems = items.filter(i => i.uid == this.uid);
      console.log(myItems);
      if(myItems && myItems.length > 0){        
        this.registroMes = myItems[0];
      }
      this.spinner.hide();
    })

    this.createForm();    
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      gastoCtrl:['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    });
  }

  save(){    
    this.gasto.idMes = this.registroMes.docId;
    //console.log(this.gasto);
    this.spinner.show();   
    
    this.gastoService.addItem(this.gasto)
    .then(()=>{  
      this.toast.present("Se guardaron los datos correctamente", ToastType.Success);        
      this.gasto = new Gasto();
      this.createForm();
      this.initChip();
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{
      this.spinner.hide();
    });    
  }

  selectChip(i:number){   
    if(this.selectedChip && this.selectedChip == i){
      this.gasto.categoria = null;
      this.selectedChip = null;
    }
    else{
      this.selectedChip = i;
      switch(i){
        case 0:
          this.gasto.categoria = Categoria.Impuestos;
          break;
        case 1:
          this.gasto.categoria = Categoria.Ropa;
          break;
        case 2:
          this.gasto.categoria = Categoria.Restaurantes;
          break;
        case 3:
          this.gasto.categoria = Categoria.Entretenimiento;
          break;
        case 4:
          this.gasto.categoria = Categoria.Alimento;
          break;
        case 5:
          this.gasto.categoria = Categoria.Medicina;
          break;
      } 
    }

    this.chipsDisabled.forEach((value, index)=>{      
      if(index != i){
        this.chipsDisabled[index] = !value;
      }      
    })

   
  }

  initChip(){
    this.selectedChip = null;
    this.chipsDisabled = [
      false,
      false,
      false,
      false,
      false,
      false
    ]
  }
}

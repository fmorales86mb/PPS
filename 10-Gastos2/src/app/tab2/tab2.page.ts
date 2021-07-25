import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastType } from '../models/enums/toastType-enum';
import { RegistroMensual } from '../models/resgistro-mensual';
import { AuthService } from '../services/auth.service';
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
  private Form:FormGroup;  
  mes:string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private mensualService:MensualService,
    private toast:ToastService,
    private spinner:SpinnerService
  ) {    
    this.mes= "Marzo 2020";
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
      ingresoCtrl:['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    });
  }

  save(){
    //console.log(this.fecha);    
    this.registroMes.anio = this.registroMes.fechaCompleta.year.value;
    this.registroMes.mes = this.registroMes.fechaCompleta.month.value;
    this.registroMes.uid = this.uid;

    this.spinner.show();   
    
    this.mensualService.addItem(this.registroMes)
    .then(()=>{  
      this.toast.present("Se guardaron los datos correctamente", ToastType.Success);        
    })
    .catch((err)=>{
      console.log(err);
      this.toast.Error();
    })
    .finally(()=>{
      this.spinner.hide();
    });    
  }
}

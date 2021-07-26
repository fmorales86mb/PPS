import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastType } from '../models/enums/toastType-enum';
import { RegistroMensual } from '../models/resgistro-mensual';
import { AuthService } from '../services/auth.service';
import { MensualService } from '../services/mensual.service';
import { SpinnerService } from '../services/spinner.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe]
})
export class Tab1Page implements OnInit {

  meses:string[];  
  customPickerOptions: any;  
  uid:string;  
  noEditar:boolean;
  isUpdate:boolean;
  registroMes:RegistroMensual;
  registroMeses:RegistroMensual[];
  private Form:FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private mensualService:MensualService,
    private toast:ToastService,
    private spinner:SpinnerService
    ) {
    this.registroMes = new RegistroMensual();
    this.registroMes.umbral = 50;
    this.noEditar = false;
    this.isUpdate = false;
    this.registroMeses = [];

    this.setMeses();
    this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (value) => {
          console.log(value);
          let registroAux = this.registroMeses.find((i)=>{
            return i.anio == value.year.value && i.mes == value.month.value;
          });

          if(registroAux){
            this.registroMes = registroAux;
            this.noEditar = true;
            this.isUpdate = true;
          }
          else{
            this.nuevo();
          }
          return true;
        }
      }]
    }
  }

  ngOnInit(): void {
    this.spinner.show();    
    this.uid = this.authService.GetCurrentUid(); 
    let now = new Date(); 
    
    // this.mensualService.items.subscribe((items) => {      
    //   const myItems = items.filter(i => i.uid == this.uid);
    //   console.log(myItems);
    //   if(myItems && myItems.length > 0){        
    //     this.registroMes = myItems[0];
    //     this.noEditar = true;
    //     this.isUpdate = true;
    //   }
    //   this.spinner.hide();
    // })

    this.mensualService.getObservableByUser(this.uid).subscribe((items) => {
      this.registroMeses = items;
      this.noEditar = true;
      this.isUpdate = true;

      this.registroMes = items.find((i) => {
        return i.anio == now.getFullYear() && i.mes == now.getMonth();
      });

      if(!this.registroMes){
        if(items.length > 0){        
          this.registroMes = items[0];
        }else{
          this.nuevo();
        }
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
    this.registroMes.anio = this.registroMes.fechaCompleta.year.value;
    this.registroMes.mes = this.registroMes.fechaCompleta.month.value;
    this.registroMes.uid = this.uid;

    this.spinner.show();   
    
    if(this.isUpdate){
      this.mensualService.setItemWithId(this.registroMes ,this.registroMes.docId)
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
    }else{
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

  private setMeses(){
    this.meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]; 
  }

  editar(){
    this.noEditar = !this.noEditar;
  }

  nuevo(){
    this.isUpdate = false;
    this.noEditar = false;

    this.createForm();
    this.registroMes.umbral = 50;
  }

  logout(){
    this.authService.Desloguearse();
  }
}

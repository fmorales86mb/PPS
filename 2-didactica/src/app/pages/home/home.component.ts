import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OptionSound } from 'src/app/models/optionSound';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  srcBase:string = "../../../assets/"
  userEmail:string;  
  userName:string;  
  espania:string = this.srcBase + "bandera-gallegos.png";
  pirata:string = this.srcBase + "bandera-pirata.png";
  portugal:string = this.srcBase + "bandera-portugal.png";
  animales:string =  this.srcBase + "animales.jpg";
  colores:string =  this.srcBase + "colores.jpeg";
  numeros:string =   this.srcBase + "numeros.jpg";
  temaSeleccionado:number;
  idiomaSeleccionado:number;
  listadoAnimales: OptionSound[];
  listadoNumeros:OptionSound[];
  listadoColores:OptionSound[];

  constructor(public toastController: ToastController,
    private authService:AuthService,
    private audioService:AudioService) {    
      this.temaSeleccionado = 1;
      this.idiomaSeleccionado = 1;
      this.initListadoAnimales();
      this.initListadoNumeros();
      this.initListadoColores();
  }

  ngOnInit() {
    this.userEmail = this.authService.GetCurrentUser().email;
    this.userName = this.authService.GetCurrentUser().nombre;
  }

  setTema(tema:number){
    this.temaSeleccionado = tema;
  }
  setIdioma(idioma:number){
    this.idiomaSeleccionado = idioma;
  }

  clickLogout(){
    this.authService.Desloguearse();
  }

  test(){
    this.audioService.palySound("test.mp3");
  }

  playSound(item:OptionSound){
//    this.test();
    switch(this.idiomaSeleccionado){
      case 1:
        this.audioService.palySound(item.es);
        break;
      case 2:
        this.audioService.palySound(item.en);
        break;
      case 3:
        this.audioService.palySound(item.po);
        break;
    }
  }

  initListadoAnimales(){
    this.listadoAnimales = [
      {
        src: this.srcBase + "temas/animales/caballo.jpg",
        es: "es/animales/Audio Recording 17-49-59.mp3",
        po: "po/animales/Audio Recording 18-26-31.mp3",
        en: "en/animales/Audio Recording 18-3-16.mp3"
      },
      {
        src: this.srcBase + "temas/animales/conejo.webp",
        es: "es/animales/Audio Recording 17-50-4.mp3",
        po: "po/animales/Audio Recording 18-26-46.mp3",
        en: "en/animales/Audio Recording 18-3-42.mp3"
      },
      {
        src: this.srcBase + "temas/animales/gato.jpg",
        es: "es/animales/Audio Recording 17-50-11.mp3",
        po: "po/animales/Audio Recording 18-26-59.mp3",
        en: "en/animales/Audio Recording 18-4-19.mp3"
      },
      {
        src: this.srcBase + "temas/animales/oveja.jpg",
        es: "es/animales/Audio Recording 17-50-15.mp3",
        po: "po/animales/Audio Recording 18-27-13.mp3",
        en: "en/animales/Audio Recording 18-4-41.mp3"
      },
      {
        src: this.srcBase + "temas/animales/perro.jpg",
        es: "es/animales/Audio Recording 17-50-20.mp3",
        po: "po/animales/Audio Recording 18-27-34.mp3",
        en: "en/animales/Audio Recording 18-4-54.mp3"
      },
      {
        src: this.srcBase + "temas/animales/vaca.jpg",
        es: "es/animales/Audio Recording 17-50-24.mp3",
        po: "po/animales/Audio Recording 18-27-48.mp3",
        en: "en/animales/Audio Recording 18-5-8.mp3"
      }                              
    ];
  }

  initListadoNumeros(){
    this.listadoNumeros = [
      {
        src: this.srcBase + "temas/numeros/uno.jpg",
        es: "es/numeros/Audio Recording 17-46-51.mp3",
        po: "po/numeros/Audio Recording 18-22-44.mp3",
        en: "en/numeros/Audio Recording 18-7-55.mp3"
      },
      {
        src: this.srcBase + "temas/numeros/dos.jpg",
        es: "es/numeros/Audio Recording 17-47-22.mp3",
        po: "po/numeros/Audio Recording 18-22-53.mp3",
        en: "en/numeros/Audio Recording 18-9-38.mp3"
      },
      {
        src: this.srcBase + "temas/numeros/tres.jpg",
        es: "es/numeros/Audio Recording 17-47-27.mp3",
        po: "po/numeros/Audio Recording 18-23-1.mp3",
        en: "en/numeros/Audio Recording 18-10-19.mp3"
      },
      {
        src: this.srcBase + "temas/numeros/cuatro.jpg",
        es: "es/numeros/Audio Recording 17-47-32.mp3",
        po: "po/numeros/Audio Recording 18-23-11.mp3",
        en: "en/numeros/Audio Recording 18-11-41.mp3"
      },
      {
        src: this.srcBase + "temas/numeros/cinco.jpg",
        es: "es/numeros/Audio Recording 17-47-37.mp3",
        po: "po/numeros/Audio Recording 18-23-20.mp3",
        en: "en/numeros/Audio Recording 18-11-54.mp3"
      },
      {
        src: this.srcBase + "temas/numeros/seis.jpg",
        es: "es/numeros/Audio Recording 17-47-41.mp3",
        po: "po/numeros/Audio Recording 18-23-28.mp3",
        en: "en/numeros/Audio Recording 18-12-10.mp3"
      } 
    ];    
  }

  initListadoColores(){
    this.listadoColores = [
      {
        src: "red",
        es: "es/colores/Audio Recording 17-51-33.mp3",
        po: "po/colores/Audio Recording 18-20-47.mp3",
        en: "en/colores/Audio Recording 18-13-21.mp3"
      },
      {
        src: "blue",
        es: "es/colores/Audio Recording 17-52-6.mp3",
        po: "po/colores/Audio Recording 18-21-1.mp3",
        en: "en/colores/Audio Recording 18-13-37.mp3"
      },
      {
        src: "green",
        es: "es/colores/Audio Recording 17-52-10.mp3",
        po: "po/colores/Audio Recording 18-21-15.mp3",
        en: "en/colores/Audio Recording 18-13-48.mp3"
      },
      {
        src: "yellow",
        es: "es/colores/Audio Recording 17-52-14.mp3",
        po: "po/colores/Audio Recording 18-21-28.mp3",
        en: "en/colores/Audio Recording 18-14-1.mp3"
      },
      {
        src: "orange",
        es: "es/colores/Audio Recording 17-52-19.mp3",
        po: "po/colores/Audio Recording 18-21-40.mp3",
        en: "en/colores/Audio Recording 18-14-13.mp3"
      },
      {
        src: "brown",
        es: "es/colores/Audio Recording 17-52-23.mp3",
        po: "po/colores/Audio Recording 18-21-52.mp3",
        en: "en/colores/Audio Recording 18-14-25.mp3"
      } 
    ];
  }

}

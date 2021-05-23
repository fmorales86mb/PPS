import { Injectable } from '@angular/core';
import {Howl, Howler} from '../../../node_modules/howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  
  palySound(audioName:string){
    let audioSrc = '../../assets/sonidos/' + audioName;
    
    const sound = new Howl({
      src: [audioSrc]
    });

    sound.play();
  }
  
}

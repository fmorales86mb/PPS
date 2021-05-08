import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  
  constructor(
    private animationController: AnimationController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const animacion: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(2000)      
      .fromTo('opacity', '0', '1');

    const animacion1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(2000)      
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);

    const name: Animation = this.animationController
    .create()
    .addElement(document.querySelector('.name'))
    .duration(2000)      
    .fromTo('opacity', '0', '1');

    const curso: Animation = this.animationController
    .create()
    .addElement(document.querySelector('.curso'))
    .duration(2000)      
    .fromTo('opacity', '0', '1');
      
    animacion.play().then(()=>{
      name.play();
      curso.play();
      animacion1.play().then(()=>{
         this.router.navigateByUrl('login');    
      })
    });   
  }
}

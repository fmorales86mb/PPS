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
  ) { }

  ngOnInit() {

    const name1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.name'))
      .duration(5000)
      .fromTo('opacity', '0', '1');

    const name2: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.name'))
      .duration(3600)
      .fromTo('transform', 'translateY(0px)', 'translateY(140px)')

    const curso1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.curso'))
      .duration(5000)
      .fromTo('opacity', '0', '1');
    
    const curso2: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.curso'))
      .duration(3600)
      .fromTo('transform', 'translateY(0px)', 'translateY(-140px)')

    const animacion1: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(2000)
      .fromTo('opacity', '0', '1');
    const animacion2: Animation = this.animationController
      .create()
      .addElement(document.querySelector('.animacion'))
      .duration(2000)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 1, transform: 'rotate(360deg)' },
      ]);

    curso1.play();
    curso2.play();
    
    name1.play();
    name2.play();

    animacion1.play().then(() => {
      animacion2.play().then(() => {
        this.router.navigateByUrl('home');
      });
    });
  }

}

import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clientLogos = [
    'assets/img/clients/logo-01.png',
    'assets/img/clients/logo-02.png',
    'assets/img/clients/logo-03.png',
    'assets/img/clients/logo-04.png',
    'assets/img/clients/logo-05.png',
    'assets/img/clients/logo-06.png',
    'assets/img/clients/logo-07.png',
    'assets/img/clients/logo-08.png',
  ];
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}

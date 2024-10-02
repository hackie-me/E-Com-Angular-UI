import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonialsData = [
    {
      image: 'assets/img/testimonial/img1.jpg',
      text: '“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe porro neque a nam nulla quos atque reprehenderit eius corrupti amet! hic et quidem. Dignissimos ad maxime velit unde inventore quasi vero dolorem. “',
      name: 'Jared Erondu',
      position: '- CEO & art director'
    },
    {
      image: 'assets/img/testimonial/img2.jpg',
      text: '“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe porro neque a nam nulla quos atque reprehenderit eius corrupti amet! hic et quidem. Dignissimos ad maxime velit unde inventore quasi vero dolorem. “',
      name: 'Cadic Vegeta',
      position: '- Graphic Design'
    },
    {
      image: 'assets/img/testimonial/img3.jpg',
      text: '“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe porro neque a nam nulla quos atque reprehenderit eius corrupti amet! hic et quidem. Dignissimos ad maxime velit unde inventore quasi vero dolorem. “',
      name: 'Jonathan Beri',
      position: '- Web Developer'
    }
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

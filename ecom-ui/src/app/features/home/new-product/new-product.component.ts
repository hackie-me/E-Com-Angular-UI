import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productsData: any = [
    {
      id: 1,
      name: 'Nisi Ut Aliqu',
      image: 'assets/img/feature-products/img-01.jpg',
      price: 49.00,
      oldPrice: null,
      rating: 3,
      sticker: { type: 'new', label: 'NEW' }
    },
    {
      id: 2,
      name: 'Eius Modi Tempo',
      image: 'assets/img/feature-products/img-02.jpg',
      price: 59.00,
      oldPrice: 79.00,
      rating: 4,
      sticker: null
    },
    {
      id: 3,
      name: 'Quia Voluptas Sit',
      image: 'assets/img/feature-products/img-03.jpg',
      price: 68.00,
      oldPrice: null,
      rating: 3,
      sticker: { type: 'sale', label: 'Sale' }
    },
    {
      id: 4,
      name: 'An Tium Lores Eos',
      image: 'assets/img/feature-products/img-04.jpg',
      price: 59.00,
      oldPrice: 69.00,
      rating: 2,
      sticker: null
    },
    {
      id: 5,
      name: 'Magni Dolores Eos',
      image: 'assets/img/feature-products/img-05.jpg',
      price: 79.00,
      oldPrice: null,
      rating: 3,
      sticker: { type: 'discount', label: '-40%' }
    }
  ]

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

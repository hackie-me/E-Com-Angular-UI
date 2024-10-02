import { Component } from '@angular/core';

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
}

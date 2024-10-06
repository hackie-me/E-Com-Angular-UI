import { Component } from '@angular/core';
import GridHeader from '../../../shared/interfaces/grid-header';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Products', url: '/admin/products' },
    { label: 'List' },
  ];
}

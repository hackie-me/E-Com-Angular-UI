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
  routesData = [
    { name: 'add', url: '/admin/products/create' },
    { name: 'edit', url: '/admin/products/edit' },
    { name: 'view', url: '/admin/products/view' },
    { name: 'delete', url: '/admin/products/delete' }, 
  ];
}

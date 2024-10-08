import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class AdminShopComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Shops', url: '/admin/shops' },
    { label: 'List' },
  ];
  routesData = [
    { name: 'add', url: '/admin/shops/create' },
    { name: 'edit', url: '/admin/shops/edit' },
    { name: 'view', url: '/admin/shops/view' },
    { name: 'delete', url: '/admin/shops/delete' }, 
  ];
}

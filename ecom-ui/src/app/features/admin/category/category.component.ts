import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Categories', url: '/admin/category' },
    { label: 'List' },
  ];

  routesData = [
    { name: 'add', url: '/admin/categories/create' },
    { name: 'edit', url: '/admin/categories/edit' },
    { name: 'view', url: '/admin/categories/view' },
    { name: 'delete', url: '/admin/categories/delete' }, 
  ];
}

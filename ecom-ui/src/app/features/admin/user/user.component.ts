import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Users', url: '/admin/users' },
    { label: 'List' },
  ];

  routesData = [
    { name: 'add', url: '/admin/users/create' },
    { name: 'edit', url: '/admin/users/edit' },
    { name: 'view', url: '/admin/users/view' },
    { name: 'delete', url: '/admin/users/delete' }, 
  ];
}

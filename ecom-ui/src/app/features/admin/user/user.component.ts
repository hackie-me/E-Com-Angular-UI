import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../shared/interfaces/grid-header';

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

  users: any[] = []; 
  gridHeader: GridHeader[] = [];

  constructor(private http: HttpService) { } 

  ngOnInit() { 
    this.getAllUsers(); 
    this.setGridHeader(); 
  } 

  setGridHeader() { 
    this.gridHeader = [ 
      createGridHeader({ dataType: 'text', fieldName: 'id', displayName: 'Id' }), 
      createGridHeader({ dataType: 'text', fieldName: 'firstName', displayName: 'First Name' }),
      createGridHeader({ dataType: 'text', fieldName: 'lastName', displayName: 'Last Name' }),
      createGridHeader({ dataType: 'text', fieldName: 'username', displayName: 'Username' }),
      createGridHeader({ dataType: 'text', fieldName: 'email', displayName: 'Email' }),  
      createGridHeader({ dataType: 'date', fieldName: 'createdAt', displayName: 'Created At' }), 
    ];
  }

  getAllUsers = () => { 
    this.http.get('user').subscribe((res: any) => { 
      this.users = res.data;  
    }); 
  } 
}

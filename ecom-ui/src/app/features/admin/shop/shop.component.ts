import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../shared/interfaces/grid-header';

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

  shops: any[] = []; 
  gridHeader: GridHeader[] = [];

  constructor(private http: HttpService) { } 

  ngOnInit() { 
    this.getAllShops(); 
    this.setGridHeader(); 
  } 

  setGridHeader() { 
    this.gridHeader = [ 
      createGridHeader({ dataType: 'text', fieldName: 'id', displayName: 'Id' }), 
      createGridHeader({ dataType: 'text', fieldName: 'companyName', displayName: 'Company Name' }),  
      createGridHeader({ dataType: 'text', fieldName: 'authorName', displayName: 'Author Name' }),
      createGridHeader({ dataType: 'text', fieldName: 'email', displayName: 'Email' }),
      createGridHeader({ dataType: 'text', fieldName: 'phone', displayName: 'Phone' }),
      createGridHeader({ dataType: 'text', fieldName: 'createdBy', displayName: 'Created By' }),
      createGridHeader({ dataType: 'date', fieldName: 'createdAt', displayName: 'Created At' }), 
    ];
  }

  getAllShops = () => { 
    this.http.get('shop').subscribe((res: any) => { 
      this.shops = res.data;  
    }); 
  } 
}

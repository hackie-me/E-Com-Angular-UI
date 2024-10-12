import { Component } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../shared/interfaces/grid-header';

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

  categories: any[] = []; 
  gridHeader: GridHeader[] = []; 

  constructor(private http: HttpService) { } 

  ngOnInit() { 
    this.getAllCategories(); 
    this.setGridHeader(); 
  } 

  setGridHeader() { 
    this.gridHeader = [ 
      createGridHeader({ dataType: 'text', fieldName: 'name', displayName: 'Name' }), 
      createGridHeader({ dataType: 'text', fieldName: 'type', displayName: 'Type' }), 
      createGridHeader({ dataType: 'text', fieldName: 'created_by', displayName: 'Created By' }),  
      createGridHeader({ dataType: 'datetime', fieldName: 'created_at', displayName: 'Created At' }), 
    ];
  }

  getAllCategories = () => { 
    this.http.get('categories').subscribe((res: any) => { 
      this.categories = res.data;  
    }); 
  } 
}

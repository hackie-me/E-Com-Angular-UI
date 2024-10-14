import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../../shared/interfaces/grid-header';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'State', url: '/admin/states' },
    { label: 'List' },
  ];
  routesData = [
    { name: 'add', url: '/admin/location/states/create' },
    { name: 'edit', url: '/admin/location/states/edit' },
    { name: 'view', url: '/admin/location/states/view' },
    { name: 'delete', url: '/admin/location/states/delete' }, 
  ];

  data: any[] = []; 
  gridHeader: GridHeader[] = [];

  constructor(private http: HttpService) { } 

  ngOnInit() { 
    this.getAllListData(); 
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

  getAllListData = () => { 
    this.http.get('state').subscribe((res: any) => { 
      this.data = res.data;  
    }); 
  } 
}

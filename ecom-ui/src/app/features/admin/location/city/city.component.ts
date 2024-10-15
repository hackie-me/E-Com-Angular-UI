import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../../shared/interfaces/grid-header';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'City', url: '/admin/cities' },
    { label: 'List' },
  ];
  routesData = [
    { name: 'add', url: '/admin/location/cities/create' },
    { name: 'edit', url: '/admin/location/cities/edit' },
    { name: 'view', url: '/admin/location/cities/view' },
    { name: 'delete', url: '/admin/location/cities/delete' }, 
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
      createGridHeader({ dataType: 'text', fieldName: 'name', displayName: 'Country Name' }),  
      createGridHeader({ dataType: 'text', fieldName: 'code', displayName: 'Country Code' }),
      createGridHeader({ dataType: 'text', fieldName: 'state', displayName: 'State Name' }),
      createGridHeader({ dataType: 'text', fieldName: 'createdBy', displayName: 'Created By' }),
      createGridHeader({ dataType: 'date', fieldName: 'createdAt', displayName: 'Created At' }), 
    ];
  }

  getAllListData = () => { 
    this.http.get('city').subscribe((res: any) => { 
      this.data = res.data;  
    }); 
  } 
}

import { Component } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import GridHeader, { createGridHeader } from '../../../../shared/interfaces/grid-header';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Country', url: '/admin/countries' },
    { label: 'List' },
  ];
  routesData = [
    { name: 'add', url: '/admin/location/countries/create' },
    { name: 'edit', url: '/admin/location/countries/edit' },
    { name: 'view', url: '/admin/location/countries/view' },
    { name: 'delete', url: '/admin/location/countries/delete' }, 
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
    this.http.get('country').subscribe((res: any) => { 
      this.data = res.data;  
    }); 
  } 
}

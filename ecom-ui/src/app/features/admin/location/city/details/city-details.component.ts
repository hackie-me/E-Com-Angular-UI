import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../core/services/http.service';
import Breadcrumb from '../../../../../shared/interfaces/bread-crump';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css'
})
export class CityDetailsComponent {
  title: string = '';
  action: string = 'Create';

  breadcrumbs: Breadcrumb[] = [];
  formData: any[] = [] 

  constructor(private router: Router,private http: HttpService) { }

  ngOnInit() {
    this.formSetup();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Current URL:', currentUrl);
        this.title = currentUrl.includes('create') ? 'Create New City' : '';
        this.title = currentUrl.includes('edit') ? 'Edit City' : '';
        this.title = currentUrl.includes('view') ? 'City Details' : '';
        this.action = currentUrl.includes('edit') ? 'Edit' : '';
        this.action = currentUrl.includes('create') ? 'Create' : '';
        this.action = currentUrl.includes('view') ? 'View' : '';
        this.breadcrumbs = [
          { label: 'Dashboard', url: '/admin/dashboard' },
          { label: 'Location', url: '/admin/location/cities' },
          { label: 'City', url: '/admin/location/cities/create' },
          { label: this.action },
        ];
      }
    });
  }

  formSetup() {
    this.formData = [
      {
        "name": "name",
        "type": "text",
        "label": "City Name",
        "placeholder": "Enter City name", 
        "validations": {
          "required": true
        }
      },
      {
        "name": "code",
        "type": "text",
        "label": "City Code",
        "placeholder": "Enter City code", 
        "validations": {
          "required": true
        }
      },
      {
        "name": "stateId",
        "type": "select",
        "label": "State",
        "options": [], 
        "placeholder": "Select State",
        "validations": {
          "required": true
        }
      }
    ];

    this.http.get('location/state').subscribe((res: any) => {
      this.formData[2].options = res.data.map((item: any) => {
        return { value: item.id, label: item.name }
      });
    });
  }

}

import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';
import { HttpService } from '../../../../../core/services/http.service';
import Breadcrumb from '../../../../../shared/interfaces/bread-crump';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrl: './state-details.component.css'
})
export class StateDetailsComponent {
  title: string = '';
  action: string = 'Create';
  form!: UntypedFormGroup; // Non-null assertion for the form

  breadcrumbs: Breadcrumb[] = [];
  formData: any[] = [] 

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.formSetup();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Current URL:', currentUrl);
        this.title = currentUrl.includes('create') ? 'Create New State' : '';
        this.title = currentUrl.includes('edit') ? 'Edit State' : '';
        this.title = currentUrl.includes('view') ? 'State Details' : '';
        this.action = currentUrl.includes('edit') ? 'Edit' : '';
        this.action = currentUrl.includes('create') ? 'Create' : '';
        this.action = currentUrl.includes('view') ? 'View' : '';
        this.breadcrumbs = [
          { label: 'Dashboard', url: '/admin/dashboard' },
          { label: 'Location', url: '/admin/location/states' },
          { label: 'State', url: '/admin/location/states/create' },
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
        "label": "State Name",
        "placeholder": "Enter State name", 
        "validations": {
          "required": true
        }
      },
      {
        "name": "code",
        "type": "text",
        "label": "State Code",
        "placeholder": "Enter State code", 
        "validations": {
          "required": true
        }
      },
      {
        "name": "CountryId",
        "type": "select",
        "label": "Select Country",
        "placeholder": "Select Country", 
        "options": [],
        "validations": {
          "required": true
        }
      }
    ]

    this.http.get('location/country').subscribe((res: any) => {
      this.formData[2].options = res.data.map((item: any) => {
        return { value: item.id, label: item.name }
      });
    });
  }
}

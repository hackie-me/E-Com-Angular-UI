import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../core/services/http.service';
import Breadcrumb from '../../../../../shared/interfaces/bread-crump';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent {
  title: string = '';
  action: string = 'Create';
  form!: UntypedFormGroup; // Non-null assertion for the form

  breadcrumbs: Breadcrumb[] = [];
  formData: any[] = [];

  constructor(private router: Router,private fb: UntypedFormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.formSetup();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Current URL:', currentUrl);
        this.title = currentUrl.includes('create') ? 'Create New Country' : '';
        this.title = currentUrl.includes('edit') ? 'Edit Country' : '';
        this.title = currentUrl.includes('view') ? 'Country Details' : '';
        this.action = currentUrl.includes('edit') ? 'Edit' : '';
        this.action = currentUrl.includes('create') ? 'Create' : '';
        this.action = currentUrl.includes('view') ? 'View' : '';
        this.breadcrumbs = [
          { label: 'Dashboard', url: '/admin/dashboard' },
          { label: 'Location', url: '/admin/location/countries' },
          { label: 'Country', url: '/admin/location/countries/create' },
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
      "label": "Country Name",
      "placeholder": "Enter country name", 
      "validations": {
        "required": true
      }
    },
    {
      "name": "code",
      "type": "text",
      "label": "Country Code",
      "placeholder": "Enter country code", 
      "validations": {
        "required": true
      }
    },
    {
      "name": "phoneCode",
      "type": "text",
      "label": "Phone Code",
      "placeholder": "Enter phone code", 
      "validations": {
        "required": true
      }
    }
  ];
  }
}

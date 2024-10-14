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
  fields: any[] = [
    {
      "name": "username",
      "type": "text",
      "label": "Username",
      "validations": {
        "required": true,
        "minlength": 4
      }
    },
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "validations": {
        "required": true,
        "email": true
      }
    },
    {
      "name": "age",
      "type": "number",
      "label": "Age",
      "validations": {
        "required": true,
        "min": 18
      }
    }
  ]  
  constructor(private router: Router,private fb: UntypedFormBuilder, private http: HttpService) {

  }

  ngOnInit() {
    this.formSetup(); // Initialize the form on component init
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects || event.url;
        console.log('Current URL:', currentUrl);
        this.title = currentUrl.includes('create') ? 'Create New Category' : '';
        this.title = currentUrl.includes('edit') ? 'Edit Category' : '';
        this.title = currentUrl.includes('view') ? 'Category Details' : '';
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
    this.form = this.fb.group({
      name: new UntypedFormControl('', [Validators.required]),
    });
  }

  validateForm() {
    if (this.form.invalid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched();
        this.form.controls[key].updateValueAndValidity();
      }
      alert('Add required fields');
    } else {
      this.http.post('location/country', this.form.value).subscribe((res: any) => {
        console.log('Response:', res);
      });
    }
  }
}

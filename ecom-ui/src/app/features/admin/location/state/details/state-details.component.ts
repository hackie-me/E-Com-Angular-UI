import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
          { label: 'Location', url: '/admin/location/states' },
          { label: 'State', url: '/admin/location/states/create' },
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
      this.http.post('location/state', this.form.value).subscribe((res: any) => {
        console.log('Response:', res);
      });
    }
  }
}

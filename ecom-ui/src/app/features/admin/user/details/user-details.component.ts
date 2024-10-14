import { HttpService } from './../../../../core/services/http.service';
import { Component } from '@angular/core';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { NavigationEnd, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  title: string = 'user';
  action: string = 'Create';
  form!: UntypedFormGroup; // Non-null assertion
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,private fb: UntypedFormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.formSetup(); // Initialize the form
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
          { label: 'Categories', url: '/admin/categories' },
          { label: this.action },
        ];
      }
    });
  }
  formSetup() {
    this.form = this.fb.group({
      firstName: new UntypedFormControl('hello', [Validators.required]), 
      lastName: new UntypedFormControl('test', [Validators.required]), 
      userName: new UntypedFormControl('soometi', [Validators.required]), 
      email: new UntypedFormControl('sghjkaj@yopmail.com', [Validators.required, Validators.email]), 
      password: new UntypedFormControl('123', [Validators.required]), 
      confirm_password: new UntypedFormControl('123', [Validators.required]), 
      // isAdmin: new UntypedFormControl(false), 
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
      this.http.post('user', this.form.value).subscribe((res: any) => {
        console.log('Response:', res);
      });
    }
  }
}

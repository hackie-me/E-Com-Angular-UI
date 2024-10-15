import { http } from './../../../../../../../api/config/app';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Breadcrumb from '../../../../shared/interfaces/bread-crump';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {

  title: string = 'catagory';
  action: string = 'Create';
  form!: UntypedFormGroup; // Use non-null assertion

  breadcrumbs: Breadcrumb[] = [];
  blogs: any;

  constructor(private router: Router,private fb: UntypedFormBuilder, private http: HttpService) { }

  ngOnInit() {
    this.formSetup(); // Initialize the form in ngOnInit
    this.fetchBlogs(); // Call to fetch data when component initializes
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
      name: new UntypedFormControl('', [Validators.required]),
      categoryType: new UntypedFormControl('', [Validators.required]),
    });
  }

  validateForm() {
    if (this.form.invalid) {
      for (let key in this.form.controls) {
        this.form.controls[key].markAsTouched(); // markAsTouched instead of markAsUntouched
        this.form.controls[key].updateValueAndValidity(); // Update validity state
      }
      alert('Please fill all required fields.');
    } else {
      console.log('Form Data:', this.form.value);
      this.http.post('categories', this.form.value).subscribe((res: any) => { 
        console.log('Response:', res);
      });
    }
  }

  // Update a blog
  updateBlog(id: number) {
    if (this.form.invalid) {
      this.validateForm();
    } else {
      this.http.put(`blogs/${id}`, this.form.value).subscribe((res: any) => {
        alert('Blog updated successfully!');
        this.fetchBlogs(); // Refresh the list after update
      }, err => {
        console.error('Error updating blog:', err);
      });
    }
  }

  // Delete a blog
  deleteBlog(id: number) {
    this.http.delete(`blogs/${id}`).subscribe((res: any) => {
      alert('Blog deleted successfully!');
      this.fetchBlogs(); // Refresh the list after deletion
    }, err => {
      console.error('Error deleting blog:', err);
    });
  }

  // Fetch all blogs
  fetchBlogs() {
    this.http.get('blogs').subscribe((res: any) => {
      this.blogs = res.data; // Assuming response has a data array
    }, err => {
      console.error('Error fetching blogs:', err);
    });
  }
  // Prefill form for update
  prefillForm(blog: any) {
    this.form.patchValue({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      thumbnail: blog.thumbnail,
      category_id: blog.category_id,
    });
  }
}

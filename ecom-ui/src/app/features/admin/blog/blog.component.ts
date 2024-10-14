import ActionRoutes from '../../../shared/interfaces/action-routes';
import GridHeader, { createGridHeader } from '../../../shared/interfaces/grid-header';
import { HttpService } from './../../../core/services/http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class AdminBlogComponent {
  breadcrumbs = [
    { label: 'Dashboard', url: '/admin/dashboard' },
    { label: 'Blogs', url: '/admin/blogs' },
    { label: 'List' },
  ];

  routesData = [
    { name: 'add', url: '/admin/blogs/create' },
    { name: 'edit', url: '/admin/blogs/edit' },
    { name: 'view', url: '/admin/blogs/view' },
    { name: 'delete', url: '/admin/blogs/delete' }, 
  ];
  blogs: any[] = []; 
  gridHeader: GridHeader[] = [];

  constructor(private http: HttpService) { } 

  ngOnInit() { 
    this.getAllBlogs(); 
    this.setGridHeader(); 
  } 

  setGridHeader() { 
    this.gridHeader = [ 
      createGridHeader({ dataType: 'image', fieldName: 'thumbnail', displayName: 'Image' }), 
      createGridHeader({ dataType: 'text', fieldName: 'title', displayName: 'Title' }),
      createGridHeader({ dataType: 'text', fieldName: 'category', displayName: 'Category' }),
      createGridHeader({ dataType: 'text', fieldName: 'slug', displayName: 'Slug' }),
      createGridHeader({ dataType: 'text', fieldName: 'createdBy', displayName: 'Created By' }),  
      createGridHeader({ dataType: 'date', fieldName: 'createdAt', displayName: 'Created At' }), 
    ];
  }

  getAllBlogs = () => { 
    this.http.get('blog').subscribe((res: any) => { 
      this.blogs = res.data;  
    }); 
  } 
}

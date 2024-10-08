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
}

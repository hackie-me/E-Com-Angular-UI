import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blogs' }
  ];

  posts = [
    {
      image: 'assets/img/blog/img-1.jpg',
      title: 'The Ultimate Guide to Blogging',
      author: 'John Doe',
      comments: 12,
      date: 'September 29, 2024',
      description: 'This is a comprehensive guide on how to start a successful blog, covering all the necessary tools and techniques.'
    },
    {
      image: 'assets/img/blog/img-2.jpg',
      title: 'How to Monetize Your Blog',
      author: 'Jane Smith',
      comments: 8,
      date: 'September 27, 2024',
      description: 'Learn how to effectively monetize your blog through various strategies including ads, affiliate marketing, and sponsored content.'
    },
    {
      image: 'assets/img/blog/img-1.jpg',
      title: 'Top 10 SEO Tips for Bloggers',
      author: 'David Green',
      comments: 20,
      date: 'September 25, 2024',
      description: 'Improve your blog’s visibility with these essential SEO tips, ranging from keyword optimization to backlink strategies.'
    }
  ];
}

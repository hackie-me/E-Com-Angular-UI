import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  recentPosts = [
    { title: 'Nam lobortis elit justo ultrices', img: 'assets/img/post/thumb1.jpg', date: '27-07-2017' },
    { title: 'Sed ut perspiciatis unde', img: 'assets/img/post/thumb2.jpg', date: '27-07-2017' },
    { title: 'Sed in odio faucibus sagittis', img: 'assets/img/post/thumb3.jpg', date: '27-07-2017' }
  ];

  aboutWidget = {
    img: 'assets/img/blog/about-w.jpg',
    title: 'Pellentesque malesapibus maximus.',
    text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    text2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias illum ratione,'
  };

  categories = [
    { name: 'All about clothing', count: 50 },
    { name: 'Make-up & beauty', count: 18 },
    { name: 'Accessories', count: 0 },
    { name: 'Fashion trends', count: 11 },
    { name: 'Haircuts & hairstyles', count: 15 }
  ];

  adWidget = {
    img: 'assets/img/blog/add-blog.jpg'
  };

  tags = ['Fashion', 'Clothing', 'Trends', 'Shoes', 'Tops', 'Sell Off', 'Women Fashion'];

  constructor() { }

  ngOnInit(): void {
  }
}

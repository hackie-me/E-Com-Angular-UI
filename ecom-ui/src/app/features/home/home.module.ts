import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FeaturedCategoryComponent } from './featured-category/featured-category.component';
import { ShopCollectionComponent } from './shop-collection/shop-collection.component';
import { DiscountProductComponent } from './discount-product/discount-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { LatestBlogComponent } from './latest-blog/latest-blog.component';
import { ClientComponent } from './client/client.component';
import { SupportSectionComponent } from './support-section/support-section.component';
import { ServicesComponent } from './services/services.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    FeaturedCategoryComponent,
    ShopCollectionComponent,
    DiscountProductComponent,
    NewProductComponent,
    ContentAreaComponent,
    TestimonialsComponent,
    LatestBlogComponent,
    ClientComponent,
    SupportSectionComponent,
    ServicesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    CarouselModule
  ]
  
})
export class HomeModule { }

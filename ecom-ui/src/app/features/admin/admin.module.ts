import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { CategoryDetailsComponent } from './category/details/category-details.component';
import { AdminBlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog/details/blog-details.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { ShopDetailsComponent } from './shop/details/shop-details.component';
import { UserDetailsComponent } from './user/details/user-details.component';
import { AdminShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './auth/login/login.component';
import { AdminRegisterComponent } from './auth/register/register.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminBlogComponent,
    BlogDetailsComponent,
    CategoryComponent,
    CategoryDetailsComponent,
    ProductComponent,
    ProductDetailsComponent,
    AdminShopComponent,
    ShopDetailsComponent,
    UserComponent,
    UserDetailsComponent,
    AdminLoginComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    
  ]
})
export class AdminModule { }

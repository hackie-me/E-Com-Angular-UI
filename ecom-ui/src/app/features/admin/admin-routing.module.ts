import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { CategoryDetailsComponent } from './category/details/category-details.component';
import { ProductDetailsComponent } from './product/details/product-details.component';
import { BlogDetailsComponent } from './blog/details/blog-details.component';
import { ShopDetailsComponent } from './shop/details/shop-details.component';
import { UserDetailsComponent } from './user/details/user-details.component';
import { AdminShopComponent } from './shop/shop.component';
import { AdminBlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full' 
      },
      {
        path: 'products', 
        children: [
          {
            path: '',
            component: ProductComponent, 
          },
          {
            path: 'create', 
            component: ProductDetailsComponent, 
          },
          {
            path: 'edit/:id', 
            component: ProductDetailsComponent, 
          },
          {
            path: 'view/:id', 
            component: ProductDetailsComponent, 
          }
        ]
      },
      {
        path: 'blogs', 
        children: [
          {
            path: '',
            component: AdminBlogComponent, 
          },
          {
            path: 'create', 
            component: BlogDetailsComponent, 
          },
          {
            path: 'edit/:id', 
            component: BlogDetailsComponent, 
          },
          {
            path: 'view/:id', 
            component: BlogDetailsComponent, 
          }
        ]
      },
      {
        path: 'categories', 
        children: [
          {
            path: '',
            component: CategoryComponent, 
          },
          {
            path: 'create', 
            component: CategoryDetailsComponent, 
          },
          {
            path: 'edit/:id', 
            component: CategoryDetailsComponent, 
          },
          {
            path: 'view/:id', 
            component: CategoryDetailsComponent, 
          }
        ]
      },
      {
        path: 'shops', 
        children: [
          {
            path: '',
            component: AdminShopComponent, 
          },
          {
            path: 'create', 
            component: ShopDetailsComponent, 
          },
          {
            path: 'edit/:id', 
            component: ShopDetailsComponent, 
          },
          {
            path: 'view/:id', 
            component: ShopDetailsComponent, 
          }
        ]
      },
      {
        path: 'users', 
        children: [
          {
            path: '',
            component: UserComponent, 
          },
          {
            path: 'create', 
            component: UserDetailsComponent, 
          },
          {
            path: 'edit/:id', 
            component: UserDetailsComponent, 
          },
          {
            path: 'view/:id', 
            component: UserDetailsComponent, 
          }
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AboutComponent } from './shared/components/about/about.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { LoginComponent } from './shared/components/login/login.component';
import { WishlistComponent } from './shared/components/wishlist/wishlist.component';
import { CheckoutComponent } from './shared/components/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'shop', 
        loadChildren: () => import('./features/shop/shop.module').then(m => m.ShopModule) 
      },
      {
        path: 'blog', 
        loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule) 
      },
      {
        path: 'about',
        component: AboutComponent,
        pathMatch: 'full' 
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        pathMatch: 'full' 
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        pathMatch: 'full' 
      },
      {
        path: 'login', 
        component: LoginComponent,
        pathMatch: 'full' 
      },
      {
        path: 'contact',
        component: ContactComponent,
        pathMatch: 'full' 
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }

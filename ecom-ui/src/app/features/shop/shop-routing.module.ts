import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { SearchProductComponent } from './search-product/search-product.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    pathMatch: 'full', 
  },
  {
    path: 'search',
    component: SearchProductComponent,
    pathMatch: 'full', 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }

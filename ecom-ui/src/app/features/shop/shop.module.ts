import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchProductComponent } from './search-product/search-product.component';


@NgModule({
  declarations: [
    ShopComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ]
})
export class ShopModule { }

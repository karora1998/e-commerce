import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {ProductItemThumbnailComponent} from './product-item-thumbnail/product-item-thumbnail.component';
import {ProductListHeaderComponent} from './product-list-header/product-list-header.component';
import {SharedComponentsModule} from '../_shared/_components/shared-components.module';

import {ProductReviewComponent} from './product/product-review/product-review.component';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import { AddReviewComponent } from './product/product-review/add-review/add-review.component';
import { AddToCartContainerComponent } from './product/add-to-cart-container/add-to-cart-container.component';



@NgModule({
    declarations: [ProductsComponent, ProductComponent, ProductItemThumbnailComponent, ProductListHeaderComponent,  ProductReviewComponent, AddReviewComponent, AddToCartContainerComponent],
  exports: [
    ProductItemThumbnailComponent,
    ProductListHeaderComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    ProductsRoutingModule,
    UiElementsModule,


  ]
})
export class ProductsModule {
}

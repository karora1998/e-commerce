import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InventoryManagerRoutingModule} from './inventory-manager-routing.module';
import {ListProductsComponent} from './products/list-products.component';
import {AddProductComponent} from './products/add-product/add-product.component';
import {EditProductComponent} from './products/edit-product/edit-product.component';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {ProductsModule} from '../products/products.module';
import {EditProductContainerComponent} from './products/edit-product-container/edit-product-container.component';


@NgModule({
  declarations: [ListProductsComponent, AddProductComponent, EditProductComponent, EditProductContainerComponent],
  imports: [
    CommonModule,
    UiElementsModule,
    InventoryManagerRoutingModule,
    ProductsModule
  ], exports: [EditProductContainerComponent]
})
export class InventoryManagerModule {
}

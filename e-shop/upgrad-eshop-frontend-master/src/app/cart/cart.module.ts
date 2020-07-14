import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ListCartComponent} from './list-cart.component';
import {CartItemComponent} from './cart-item/cart-item.component';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {SharedComponentsModule} from '../_shared/_components/shared-components.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ListCartComponent, CartItemComponent],
  exports: [ListCartComponent, CartItemComponent],
  imports: [
    CommonModule,

    UiElementsModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class CartModule {
}

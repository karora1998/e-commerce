import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedComponentsModule} from '../_shared/_components/shared-components.module';
import {RouterModule} from '@angular/router';
import {OrderRoutingModule} from './order-routing.module';
import {CartModule} from '../cart/cart.module';
import {UsersModule} from '../users/users.module';


import {ConfirmOrderComponent} from './confirm-order/confirm-order.component';
import {ViewCartItemComponent} from './confirm-order/view-cart-item/view-cart-item.component';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {ApplyCouponComponent} from './confirm-order/apply-coupon/apply-coupon.component';
import {YourItemsComponent} from './confirm-order/your-items/your-items.component';
import {YourAddressComponent} from './confirm-order/your-address/your-address.component';
import {OrderAmountComponent} from './confirm-order/order-amount/order-amount.component';
import {PaymentModule} from '../payment/payment.module';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {MatTableModule} from '@angular/material/table';
import {CreateOrderComponent} from './create-order/create-order.component';


@NgModule({
  declarations: [ ConfirmOrderComponent, ViewCartItemComponent, OrderHistoryComponent, OrderDetailComponent, ApplyCouponComponent, YourItemsComponent, YourAddressComponent, OrderAmountComponent, CreateOrderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule,
    OrderRoutingModule,
    UiElementsModule,
    CartModule,
    UsersModule,
    PaymentModule,
    MatTableModule

  ]
})
export class OrderModule {
}

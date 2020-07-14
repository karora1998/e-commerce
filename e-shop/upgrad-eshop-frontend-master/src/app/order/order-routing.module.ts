import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoggedinUserGuard} from '../_shared/_guards/loggedin-user.guard';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {HasCartItemsGuard} from '../_shared/_guards/has-cart-items.guard';


export const orderRoutes: Routes = [
    {
      path: 'orders',
      children: [
        {path: 'create', component: CreateOrderComponent, canActivate: [HasCartItemsGuard]},
        {path: 'history', component: OrderHistoryComponent},
        {path: 'detail/:id', component: OrderDetailComponent},
        {path: '', redirectTo: 'create', pathMatch: 'full'}
      ],
      canActivate: [LoggedinUserGuard]
    }
  ]
;



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(orderRoutes)],
})
export class OrderRoutingModule {
}

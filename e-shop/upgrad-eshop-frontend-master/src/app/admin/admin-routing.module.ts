import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InventoryManagerGuard} from '../_shared/_guards/inventory-manager.guard';

import {ListCouponsComponent} from './coupons/list-coupons.component';
import {AddCouponComponent} from './coupons/add-coupon/add-coupon.component';

import {AdminGuard} from '../_shared/_guards/admin.guard';
import {ListUsersComponent} from './manage-users/list-users.component';
import {AddUserWithTypeComponent} from './manage-users/add-user-with-type/add-user-with-type.component';


export const adminRoutes: Routes = [
    {
      path: 'admin',
      children: [
        {path: '', redirectTo: 'managers', pathMatch: 'full'},
        {path: 'manage-users', component: ListUsersComponent, pathMatch: 'full'},
        {path: 'manage-users/add', component: AddUserWithTypeComponent, pathMatch: 'full'},
        {path: 'coupons', component: ListCouponsComponent, pathMatch: 'full'},
        {path: 'coupons/add', component: AddCouponComponent}
      ]  ,
      canActivate: [AdminGuard]
    }
  ]
;


@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

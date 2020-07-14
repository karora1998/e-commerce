import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListCouponsComponent } from './coupons/list-coupons.component';
import { AddCouponComponent } from './coupons/add-coupon/add-coupon.component';

import {UiElementsModule} from '../_shared/_modules/ui-elements.module';

import {MatTableModule} from '@angular/material/table';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ListUsersComponent } from './manage-users/list-users.component';
import { AddUserWithTypeComponent } from './manage-users/add-user-with-type/add-user-with-type.component';
import {SharedComponentsModule} from '../_shared/_components/shared-components.module';



@NgModule({
  declarations: [ListCouponsComponent, AddCouponComponent,   ListUsersComponent, AddUserWithTypeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    UiElementsModule,
    AdminRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    SharedComponentsModule

  ]

})
export class AdminModule { }

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddressesComponent} from './addresses/addresses.component';
import {UserPanelComponent} from './user-panel.component';
import {ProfileComponent} from './profile/profile.component';
import {OrderHistoryComponent} from '../order/order-history/order-history.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {LoggedinUserGuard} from '../_shared/_guards/loggedin-user.guard';
import {AddAddressComponent} from './addresses/add-address/add-address.component';
import {EditAddressComponent} from './addresses/edit-address/edit-address.component';


export const userRoutes = [
  {
    path: 'user',
    component: UserPanelComponent, children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
      {path: 'profile/edit', component: EditProfileComponent, pathMatch: 'full'},
      {path: 'profile/changepassword', component: ChangePasswordComponent, pathMatch: 'full'},
      {path: 'addresses', component: AddressesComponent, pathMatch: 'full'},
      {path: 'addresses/add', component: AddAddressComponent},
      {path: 'addresses/edit', component: EditAddressComponent}
    ],
    canActivate: [LoggedinUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}

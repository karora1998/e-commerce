import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';

import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {SharedComponentsModule} from '../_shared/_components/shared-components.module';
import {AddressesComponent} from './addresses/addresses.component';

import {ProfileComponent} from './profile/profile.component';
import {UserPanelComponent} from './user-panel.component';

import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AddAddressComponent } from './addresses/add-address/add-address.component';
import { EditAddressComponent } from './addresses/edit-address/edit-address.component';
import { ChooseAddressComponent } from './addresses/choose-address/choose-address.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
    declarations: [AddressesComponent, ProfileComponent, UserPanelComponent,  EditProfileComponent, ChangePasswordComponent, AddAddressComponent, EditAddressComponent, ChooseAddressComponent],
    exports: [
        ChooseAddressComponent
    ],
    imports: [
        CommonModule,
        UiElementsModule,
        SharedComponentsModule,
        UsersRoutingModule,
        MatTableModule,
    ]
})
export class UsersModule { }

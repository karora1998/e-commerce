import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import {AuthRoutingModule} from './auth-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login-and-register/login/login.component';
import { RegisterComponent } from './login-and-register/register/register.component';
import {SharedComponentsModule} from '../_shared/_components/shared-components.module';



@NgModule({
  declarations: [LoginAndRegisterComponent, LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        MatMenuModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTabsModule,
        MatListModule,
        FlexModule,
        MatInputModule,
        SharedComponentsModule,
    ]
})
export class AuthModule { }

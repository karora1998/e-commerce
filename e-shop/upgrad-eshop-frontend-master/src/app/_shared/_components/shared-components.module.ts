import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingDisplayComponent} from './rating-display/rating-display.component';

import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SubNavbarComponent} from './sub-navbar/sub-navbar.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {FooterComponent} from './footer/footer.component';
import {LoaderComponent} from './loader/loader.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {RatingInputContainerComponent} from './rating-input-container/rating-input-container.component';
import {RegisterUiComponent} from './register-ui/register-ui.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CartIconComponent} from './cart-icon/cart-icon.component';
import { ChooseQuantityComponent } from './choose-quantity/choose-quantity.component';


@NgModule({
  declarations: [RatingDisplayComponent,


    NavbarComponent,
    SidebarComponent,
    SubNavbarComponent,
    SearchbarComponent,
    FooterComponent,
    RatingDisplayComponent,
    LoaderComponent,
    ConfirmDialogComponent,
    RatingInputContainerComponent,
    CartIconComponent,
    RegisterUiComponent,
    ChooseQuantityComponent],
  exports: [RatingDisplayComponent,
    NavbarComponent,
    SidebarComponent,
    SubNavbarComponent,
    SearchbarComponent,
    FooterComponent,
    RatingDisplayComponent,
    CartIconComponent,
    RegisterUiComponent,

    LoaderComponent, RatingInputContainerComponent, ChooseQuantityComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class SharedComponentsModule {
}

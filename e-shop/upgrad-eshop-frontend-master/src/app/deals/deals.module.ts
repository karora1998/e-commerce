import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsComponent } from './deals.component';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {ProductsModule} from '../products/products.module';



@NgModule({
  declarations: [DealsComponent],
  imports: [
    CommonModule,
    UiElementsModule,
    ProductsModule
  ]
})
export class DealsModule { }

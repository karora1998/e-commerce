import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProductsComponent} from './products/list-products.component';
import {AddProductComponent} from './products/add-product/add-product.component';
import {EditProductComponent} from './products/edit-product/edit-product.component';
import {InventoryManagerGuard} from '../_shared/_guards/inventory-manager.guard';


export const inventoryManagerRoutes: Routes = [
    {
      path: 'manager',
      children: [
        {path: '', redirectTo: 'products', pathMatch: 'full'},
        {path: 'products', component: ListProductsComponent, pathMatch: 'full'},
        {path: 'products/add', component: AddProductComponent},
        {path: 'products/edit', component: EditProductComponent},
      ]  ,
      canActivate: [InventoryManagerGuard]
    }
  ]
;


@NgModule({
  imports: [RouterModule.forChild(inventoryManagerRoutes)],
  exports: [RouterModule]
})
export class InventoryManagerRoutingModule { }

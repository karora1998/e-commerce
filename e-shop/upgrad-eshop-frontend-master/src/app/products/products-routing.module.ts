import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';


export const productRoutes: Routes = [
    {
      path: 'products',
      children: [
        {path: 'search/:category/:search', component: ProductsComponent},
        {path: 'category/:category', component: ProductsComponent},
        {path: 'detail/:id', component: ProductComponent},
        {path: '', component: ProductsComponent, pathMatch: 'full'}
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}

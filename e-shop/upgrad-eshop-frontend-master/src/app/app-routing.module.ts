import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DealsComponent} from './deals/deals.component';


export const approutes: Routes = [
    {path: '', redirectTo: 'deals', pathMatch: 'full'},
    { path: 'deals', component: DealsComponent}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

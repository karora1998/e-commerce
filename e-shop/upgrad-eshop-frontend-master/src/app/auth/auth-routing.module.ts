import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

;
import {LoginAndRegisterComponent} from './login-and-register/login-and-register.component';
import {AnonymousUserGuard} from '../_shared/_guards/anonymous-user.guard';


export const authRoutes: Routes = [
    {
      path: 'auth',
      children: [
        {path: 'login', component: LoginAndRegisterComponent, canActivate: [AnonymousUserGuard]},
        {path: 'register', component: LoginAndRegisterComponent, canActivate: [AnonymousUserGuard]},
        {path: '', component: LoginAndRegisterComponent, pathMatch: 'full'}
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AppDataService} from '../_services/app-data.service';
import {isLoggedIn} from '../_helpers/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserGuard implements CanActivate {

  isUserLoggedIn = false;

  constructor(private router: Router, private userAuthService: AppDataService) {

    userAuthService.authInfo$.subscribe(authInfo => {

      console.log(authInfo);
      this.isUserLoggedIn = isLoggedIn(authInfo);


    });
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.isUserLoggedIn === false) {
      this.router.navigate(['auth/login'], {queryParams: {redirectUrl: state.url}});
    }


    return this.isUserLoggedIn;
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppDataService} from '../_services/app-data.service';
import {isAdmin} from '../_helpers/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdminUser = false;

  constructor(private router: Router, private userAuthService: AppDataService) {

    userAuthService.authInfo$.subscribe(authInfo => {

      this.isAdminUser = isAdmin(authInfo);


    });
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.isAdminUser === false) {
      this.router.navigate(['auth/login'], {queryParams: {redirectUrl: state.url}});
    }


    return this.isAdminUser;
  }

}

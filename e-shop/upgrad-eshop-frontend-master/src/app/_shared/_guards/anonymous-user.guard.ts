import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppDataService} from '../_services/app-data.service';
import { isNotLoggedIn} from '../_helpers/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AnonymousUserGuard implements CanActivate {

  isAnonymousUser = true;

  constructor(private userAuthService: AppDataService) {

    userAuthService.authInfo$.subscribe(authInfo => {

      this.isAnonymousUser = isNotLoggedIn(authInfo);


    });


  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isAnonymousUser;
  }

}

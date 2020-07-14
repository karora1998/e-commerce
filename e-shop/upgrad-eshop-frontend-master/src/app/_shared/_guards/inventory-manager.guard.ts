import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AppDataService} from '../_services/app-data.service';
import {isInventoryManager} from '../_helpers/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagerGuard implements CanActivate {

  isInventoryManager = false;

  constructor(private router: Router, private userAuthService: AppDataService) {

    userAuthService.authInfo$.subscribe(authInfo => {

      this.isInventoryManager = isInventoryManager(authInfo);


    });
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.isInventoryManager === false) {
      this.router.navigate(['auth/login'], {queryParams: {redirectUrl: state.url}});
    }


    return this.isInventoryManager;
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppDataService} from '../_services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class HasCartItemsGuard implements CanActivate {

  cartItemCount = 0;

  constructor(private router: Router, private appDataService: AppDataService) {

    appDataService.cartItemsCount$.subscribe(cartItemCount => {


        this.cartItemCount = cartItemCount;




    });
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.cartItemCount === 0) {
      this.router.navigate(['/products'], );
    }

    return true;
  }

}

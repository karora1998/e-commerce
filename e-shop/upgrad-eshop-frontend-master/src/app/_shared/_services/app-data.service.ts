import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {clearLoginToken, retrieveLoginToken, saveLoginToken} from '../_helpers/storage.utils';
import {AuthInfo, User} from '../../auth/models/auth.models';
import {AuthService} from '../../auth/services/auth.service';

import {ProductService} from '../../products/services/product.service';
import {CartService} from '../../cart/services/cart.service';
import {isLoggedIn} from '../_helpers/auth.utils';
import {Cart} from '../../cart/models/cart.models';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  showProgressBar$: BehaviorSubject<boolean>;
  categories$: BehaviorSubject<string[]>;
  authInfo$: BehaviorSubject<AuthInfo>;
  cartItemsCount$: BehaviorSubject<number>;


  constructor(private productService: ProductService, private authService: AuthService, private cartService: CartService) {

    this.showProgressBar$ = new BehaviorSubject(false);
    this.categories$ = new BehaviorSubject([]);
    this.authInfo$ = new BehaviorSubject(null);
    this.cartItemsCount$ = new BehaviorSubject(0);

  }

  initializeApp() {
    this.loadCategories();
    this.loadUser();
  }

  onSignInUserInitialize(authInfo: AuthInfo) {
    if (isLoggedIn(authInfo)) {

      this.loadCart();
    }
  }

  onUpdateCart(cart: Cart) {

    const cartItemCount = this.calculateCount(cart);
    this.cartItemsCount$.next(cartItemCount);
  }

  clearCart() {


    this.cartItemsCount$.next(0);
  }

   calculateCount(cartObject) {
    if (cartObject && cartObject.cartItems) {
      return cartObject.cartItems.length;
    } else {
      return 0;
    }
  }

  loadCart() {
    this.cartService.getCart().subscribe(
      (cart) => this.onUpdateCart(cart));
  }

  loadCategories() {
    this.productService.getCategories().subscribe((value: string[]) => {
      this.categories$.next(value);
    });


  }


  onUserLoggedIn(authInfo: AuthInfo) {
    if (authInfo && authInfo.token) {

      saveLoginToken(authInfo.token);
      this.authInfo$.next(authInfo);
      this.onSignInUserInitialize(authInfo);


    }
  }

  onUpdateProfileDetails(user, token) {
    this.onUserLoggedIn({user, token});
  }

  signOut() {

    clearLoginToken();
    this.authInfo$.next(null);
    this.cartItemsCount$.next(0);
  }

  loadUser() {

    const token = retrieveLoginToken();

    if (token) {

      this.authService.getMyDetailsWithToken(token).subscribe
      ((response: AuthInfo) => {



          this.onUserLoggedIn(response);

        },
        (error => {
          this.signOut();
        }));

    } else {
      this.signOut();
    }


    // Get from storage
  }


  showLoading() {

    return this.showProgressBar$.next(true);
  }

  hideLoading() {

    return this.showProgressBar$.next(false);
  }

}

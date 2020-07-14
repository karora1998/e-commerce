import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product.models';
import {Subscription} from 'rxjs';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {CartService} from '../../../cart/services/cart.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../../cart/models/cart.models';
import {isLoggedIn} from '../../../_shared/_helpers/auth.utils';

@Component({
  selector: 'app-add-to-cart-container',
  templateUrl: './add-to-cart-container.component.html',
  styleUrls: ['./add-to-cart-container.component.scss']
})
export class AddToCartContainerComponent implements OnInit {

  @Input() product: Product;
  private cartSubscription: Subscription;
  public count = 1;
  isUserLoggedIn = false;

  constructor(private appDataService: AppDataService, private cartService: CartService, private notificationService: NotificationService, private router: Router, private activatedRoute: ActivatedRoute) {

    appDataService.authInfo$.subscribe(authInfo => {

      this.isUserLoggedIn = isLoggedIn(authInfo);
    });
  }

  ngOnInit(): void {
  }


  validateUserAndAddToCart(product: Product) {


    if (this.isUserLoggedIn) {
      this.addProductToCart(product);
    } else {
      this.router.navigate(['auth/login'], {queryParams: {redirectUrl: this.router.url}});
    }
  }

  private addProductToCart(product: Product) {
    this.appDataService.showLoading();
    this.cartSubscription = this.cartService.addToCart(product.productId, this.count).subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }

  onDataReceived(cart: Cart) {
    this.appDataService.hideLoading();
    this.appDataService.onUpdateCart(cart);

  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }

  updateCount(result: any) {

    this.count = result;
  }
}

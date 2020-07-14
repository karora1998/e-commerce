import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cart, CartItem} from './models/cart.models';
import {FormGroup} from '@angular/forms';
import {CartService} from './services/cart.service';
import {NotificationService} from '../_shared/_services/notification.service';
import {AppDataService} from '../_shared/_services/app-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.scss']
})
export class ListCartComponent implements OnInit {

  cart: Cart;
  cartItems: CartItem[];
  summaryForm: FormGroup;
  isShow: boolean;
  private cartSearchSubscription: Subscription;

  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cartService: CartService, private notificationService: NotificationService, private appDataService: AppDataService, private router: Router) {
  }

  ngOnInit(): void {

    this.reload();

  }

  reload() {
    this.appDataService.showLoading();
    this.cartSearchSubscription = this.cartService.getCart().subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );


  }

  onDataReceived(cart: Cart) {

    if (cart.cartItems.length === 0) {
      this.loadCartAndRedirect();
      return;
    }

    this.appDataService.hideLoading();
    this.cart = cart;
    this.cartItems = cart.cartItems;


    this.appDataService.onUpdateCart(cart);
  }

  onCleanCartComplete() {
    this.notificationService.showSuccessMessage('Cleaned all items in cart');
    this.loadCartAndRedirect();
  }

  private loadCartAndRedirect() {
    this.appDataService.loadCart();
    this.router.navigate(['/products']);
  }

  public onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  onContinue() {
    this.onComplete.emit();
  }

  onCleanCart() {


    this.notificationService.confirm('Do you want to Clean the cart ?')
      .then((res) => {
        this.cleanCart();
      });


  }

  private cleanCart() {
    this.cartService.removeAll().subscribe(
      (value) => this.onCleanCartComplete(),
      (error) => this.onError(error)
    );
  }
}

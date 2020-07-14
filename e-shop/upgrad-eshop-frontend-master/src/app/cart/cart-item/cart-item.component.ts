import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../products/models/product.models';
import {CartItem} from '../models/cart.models';
import {CartService} from '../services/cart.service';
import {NotificationService} from '../../_shared/_services/notification.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input()
  cartItem: CartItem;

  product: Product;


  @Output() onRefreshCart: EventEmitter<any> = new EventEmitter();

  constructor(private cartService: CartService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (this.cartItem) {
      this.product = this.cartItem.product;
    }

  }


  updateQuantity(updatedQuantity: any) {

    this.cartService.update(this.product.productId, updatedQuantity).subscribe(value => {
    }, (error => {

      this.notificationService.showErrorMessage(error);
    }));
  }

  delete() {

    this.cartService.removeFromCart(this.product.productId).subscribe(value => {

      this.onRefreshCart.emit();
    }, (error => {

      this.notificationService.showErrorMessage(error);
    }));
  }
}

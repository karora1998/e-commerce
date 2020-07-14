import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartItem} from '../../../cart/models/cart.models';
import {Product} from '../../../products/models/product.models';
import {CartService} from '../../../cart/services/cart.service';
import {NotificationService} from '../../../_shared/_services/notification.service';

@Component({
  selector: 'app-view-cart-item',
  templateUrl: './view-cart-item.component.html',
  styleUrls: ['./view-cart-item.component.scss']
})
export class ViewCartItemComponent implements OnInit {

  @Input()
  cartItem: CartItem;

  product: Product;


  constructor() {
  }

  ngOnInit(): void {
    if(this.cartItem)
    this.product = this.cartItem.product;

  }

}

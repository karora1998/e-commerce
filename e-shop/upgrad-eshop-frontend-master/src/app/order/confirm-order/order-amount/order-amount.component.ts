import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order.models';

@Component({
  selector: 'app-order-amount',
  templateUrl: './order-amount.component.html',
  styleUrls: ['./order-amount.component.scss']
})
export class OrderAmountComponent implements OnInit {

  @Input() order: Order;
  discountAmount = 0;


  constructor() {
  }

  ngOnInit(): void {




  }

  calculateDiscountAmount() {

    if (this.order.coupons) {
      return this.order.coupons.map(value => value.amount).reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
    } else {
      return 0;
    }


  }

}

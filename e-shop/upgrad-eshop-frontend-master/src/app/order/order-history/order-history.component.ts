import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../services/order.services';
import {PaymentService} from '../../payment/services/payment.service';
import {OrderPaymentService} from '../services/order-payment.service';

import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Address} from '../../users/models/user.models';
import {Order} from '../models/order.models';
import {AddressService} from '../../users/addresses/services/address.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders$: Observable<Order[]>;
  isLoaded = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'dateofpurchase', 'status', 'itemcount', 'amount'];

  constructor(private orderService: OrderService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }


  ngOnInit(): void {
    this.reloadOrders();
  }


  reloadOrders() {
    this.orders$ = this.orderService.getOrders();
  }
}

import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.services';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductResponse} from '../../products/models/product.models';
import {Order} from '../models/order.models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {


  orderId;
  order: Order=null;

  constructor(private orderService: OrderService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {


      if (params.has('id')) {
        this.orderId = params.get('id');
      }


      this.reload();

    });

  }


  onDataReceived(order: Order) {

    this.appDataService.hideLoading();
    this.order = order;
  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }


  reload() {


    this.appDataService.showLoading();
    this.orderService.getOrderById(this.orderId).subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }


}

import {Injectable} from '@angular/core';
import {OrderService} from './order.services';
import {PaymentService} from '../../payment/services/payment.service';
import {Observable, of} from 'rxjs';
import {OrderPayment, Stepper} from '../models/order.payment.models';
import {concatMap, map} from 'rxjs/operators';
import {getAsOrder, Order, OrderStatus} from '../models/order.models';
import {getAsPayment} from '../../payment/models/payment.models';

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  constructor(private orderService: OrderService, private paymentService: PaymentService) {
  }

  getCurrentStatus(): Observable<OrderPayment> {

    return this.orderService.getActiveOrder().pipe(
      concatMap(order => this.getActivePayment(order))
    );

  }

  private getActivePayment(order: Order): Observable<OrderPayment> {

    if (order.status === OrderStatus.NEW) {
      return of(new OrderPayment({order, payment: null, currentStepper: Stepper.CONFIRM}));
    } else if (order.status === OrderStatus.WAITING_FOR_PAYMENT) {

      return this.paymentService.retrievePaymentByOrder(order).pipe(
        map(payment => this.getAsPaymentOrder(payment, order))
      );

    }
  }

  getAsPaymentOrder(paymentObj: any, order: Order) {
    return new OrderPayment({order, payment: getAsPayment(paymentObj, order), currentStepper: Stepper.PAYMENT});
  }
}

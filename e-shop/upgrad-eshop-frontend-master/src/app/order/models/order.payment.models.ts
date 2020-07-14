import {Order} from './order.models';
import {Payment} from '../../payment/models/payment.models';

export enum Stepper {
  CART, ADDRESS, CONFIRM, PAYMENT
}

export class OrderPayment {
  public order: Order;
  public payment: Payment;
  public currentStepper: Stepper;

  constructor(obj: Partial<OrderPayment> = {}) {

    Object.assign(this, obj);

  }

}

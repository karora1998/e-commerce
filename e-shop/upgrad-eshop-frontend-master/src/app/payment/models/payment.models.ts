import {Order} from '../../order/models/order.models';


export class Payment {


  public amount: number;
  public currency: string;
  public description: string;
  public key: string;
  public order: Order;
  public paymentId: number;
  public razorpayOrderId: string;
  public useremail: string;
  public username: string;

  constructor(obj: Partial<Payment> = {}) {

    Object.assign(this, obj);

  }

}


export function getAsPayment(paymentObject: any, order: Order) {
  return new Payment({

    amount: paymentObject.amount,
    currency: paymentObject.currency,
    description: paymentObject.description,
    key: paymentObject.key,
    paymentId: paymentObject.paymentId,
    razorpayOrderId: paymentObject.razorpayOrderId,
    useremail: paymentObject.useremail,
    username: paymentObject.username,
    order: order


  });
}


export class RazorPayCompleteRequest {


  public razorpay_payment_id: string;
  public razorpay_order_id: string;
  public razorpay_signature: string;

  constructor(obj: Partial<RazorPayCompleteRequest> = {}) {

    Object.assign(this, obj);

  }

}



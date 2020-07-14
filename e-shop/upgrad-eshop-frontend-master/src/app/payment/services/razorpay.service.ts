import {Injectable} from '@angular/core';
import {Payment, RazorPayCompleteRequest} from '../models/payment.models';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  razorPay: any;


  isModelOpened = false;
  isPaymentSuccessful = false;


  constructor() {


  }


  makePayment(payment: Payment) {

    this.razorPay.open();

    this.isModelOpened = true;
  }


  covertAsPaise(amount) {
    let result = '' + amount;

    if (result.indexOf('.') > 0) {
      result = result.replace('.', '');
    } else {
      result = result + '00';
    }
    return parseInt(result, 0);
  }

  initiatePaymentFor(payment: Payment, success: (input) => void, error: (input) => void) {
    this.razorPay = null;
    this.isModelOpened = false;
    this.isPaymentSuccessful = false;


    const options = {
      'key': payment.key, // Enter the Key ID generated from the Dashboard
      'amount': this.covertAsPaise(payment.amount),
      'currency': payment.currency,
      'order_id': payment.razorpayOrderId,
      'description': payment.description,
      'prefill.email': payment.useremail,
      'prefill.name': payment.username,
      'name': 'Upgrad Eshop',
      'image': 'https://www.upgrad.com/apple-touch-icon-144x144.png',
      'handler': (response) => {
        this.isPaymentSuccessful = true;
        console.log('onpayment complete', response);

        success(new RazorPayCompleteRequest(response));

      },
      'modal': {
        'ondismiss': (evt) => {


          if (this.isModelOpened && this.isPaymentSuccessful === false) {
            error('Payment Cancelled/Error ,Please try again later');

          }
        }
      }
    };
    console.log('processing for payment', options);
    this.razorPay = new Razorpay(options);


  }

}

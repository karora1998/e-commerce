import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Payment, RazorPayCompleteRequest} from '../models/payment.models';
import {RazorpayService} from '../services/razorpay.service';
import {PaymentService} from '../services/payment.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {

  @Output() onPaymentComplete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private razorpayService: RazorpayService, private router: Router, private paymentService: PaymentService, private appDataService: AppDataService, private notificationService: NotificationService) {

  }

  @Input() payment: Payment;
  isProcessing = false;
  progressTxt = 'Please Wait while we process your payment';

  redirectToOrderDetail(response) {

    // Now  reload order and goto order detail page
    this.appDataService.hideLoading();
    this.notificationService.showSuccessMessage('Order Succesfully placed');

    this.onPaymentComplete.emit('completed');


  }

  onCompletePayment(razorPayCompleteRequest: RazorPayCompleteRequest) {
    this.appDataService.showLoading();
    this.progressTxt = 'We have received your payment, Please wait let us analyse the response';
    this.paymentService.verifyAndUpdatePaymentDetails(razorPayCompleteRequest).subscribe(
      (response) => this.redirectToOrderDetail(response), (error => this.onCompletePaymentError(error))
    );

  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.isProcessing = false;
    this.notificationService.showErrorMessage(error);

  }

  onCompletePaymentError(error: any) {
    this.isProcessing = false;
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage('Error Unable to complete payment, Please contact customer care');

  }

  ngOnInit(): void {


    if (this.payment) {
      this.razorpayService.initiatePaymentFor(this.payment, (response => {
        this.onCompletePayment(response);
      }), (err) => {
        console.log('erro cb on onPaymentCancelledOrError');
        this.onError(err);
      });
    }
  }


  makePayment() {

    this.isProcessing = true;
    this.razorpayService.makePayment(this.payment);


  }
}

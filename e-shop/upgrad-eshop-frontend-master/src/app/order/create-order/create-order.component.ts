import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {Address} from '../../users/models/user.models';
import {Order} from '../models/order.models';
import {Payment} from '../../payment/models/payment.models';
import {OrderService} from '../services/order.services';
import {PaymentService} from '../../payment/services/payment.service';
import {OrderPaymentService} from '../services/order-payment.service';
import {AddressService} from '../../users/addresses/services/address.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isLoggedIn} from '../../_shared/_helpers/auth.utils';
import {Stepper} from '../models/order.payment.models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {


  @ViewChild('stepper') private matStepper: MatHorizontalStepper;
  isShow: boolean;
  selectedAddress: Address;
  isUserLoggedIn = false;
  order: Order = null;
  payment: Payment = null;


  constructor(private orderService: OrderService, private paymentService: PaymentService, private orderPaymentService: OrderPaymentService, private addressService: AddressService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {


    this.appDataService.authInfo$.subscribe(authInfo => {

      this.isUserLoggedIn = isLoggedIn(authInfo);


      if (this.isUserLoggedIn) {
        this.initComponent();
      }

    });


  }


  initComponent() {


    this.orderPaymentService.getCurrentStatus().subscribe(orderPayment => {

      this.initializeStepper();
      this.order = orderPayment.order;
      this.payment = orderPayment.payment;
      this.matStepper.selectedIndex = orderPayment.currentStepper;


    });

  }


  private initializeStepper() {
    this.matStepper.next();
    this.matStepper.next();


  }

  goToChooseAddress() {

    this.matStepper.selectedIndex = Stepper.ADDRESS;

  }

  goToConfirmOrder(order: Order) {

    this.order = order;
    this.matStepper.selectedIndex = Stepper.CONFIRM;

  }




  public onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  updateAddress(selectedAddress: Address) {
    this.selectedAddress = selectedAddress;

    this.orderService.create(selectedAddress.id)
      .subscribe(order => this.goToConfirmOrder(order),
        (error => {
          this.onError(error);
        }));

  }

  gotoMakePayment(payment: Payment) {
    this.payment = payment;
    this.matStepper.selectedIndex = Stepper.PAYMENT;

  }

  onMakePayment() {


    this.paymentService.create(this.order)
      .subscribe(payment => this.gotoMakePayment(payment),
        (error => {
          this.onError(error);
        }));


  }


  onReloadOrder(value: Order) {

    this.order = value;
  }

  refreshCartAndRedirectToOrderDetail($event: any) {
    this.appDataService.clearCart()
    this.router.navigate(['/orders/detail/', this.payment.order.id]);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from '../../models/order.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../services/order.services';
import {NotificationService} from '../../../_shared/_services/notification.service';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.scss']
})
export class ApplyCouponComponent implements OnInit {
  @Input() orderId:number;
  @Output() onApply: EventEmitter<Order> = new EventEmitter<any>();


  couponForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private orderService: OrderService,private notificationService: NotificationService) {


  }


  ngOnInit(): void {

    this.couponForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

  }


  private onUpdateCouponComplete(order: Order) {

    this.notificationService.showSuccessMessage('Successfully Applied Coupon');
    this.onApply.emit(order);
  }


  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  public onCouponFormSubmit(): void {
    if (this.couponForm.valid) {


      const couponCode = this.couponForm.controls.code.value;
      const orderId = this.orderId;

      this.orderService.applyCoupon(orderId, couponCode).subscribe
      ((order: Order) => this.onUpdateCouponComplete(order),
        (error => this.onError(error)));


    }
  }


}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {NotificationService} from '../../../_shared/_services/notification.service';
import {CouponService} from '../services/coupon.service';
import {Coupon, CouponRequest} from '../models/coupon.models';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {isLoggedIn} from '../../../_shared/_helpers/auth.utils';


@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  couponForm: FormGroup;
  isLoaded = false;

  constructor(public formBuilder: FormBuilder, public router: Router, private couponService: CouponService, private notificationService: NotificationService, private appDataService: AppDataService) {


  }


  ngOnInit(): void {

    this.appDataService.authInfo$.subscribe(authInfo => {

      if (isLoggedIn(authInfo)) {
        this.isLoaded = true;
        this.initForm();
      }
    });


  }

  initForm(): void {
    this.couponForm = this.formBuilder.group(this.getFormControlsConfigForCoupon());

  }


  getFormControlsConfigForCoupon() {
    return {
      name: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1)])]
    };
  }


  getCouponRequestFromForm(currentCouponForm: FormGroup) {
    return new CouponRequest({
      name: currentCouponForm.controls.name.value,
      amount: currentCouponForm.controls.amount.value
    });
  }


  private onUpdateCouponComplete(coupon: Coupon) {

    this.notificationService.showSuccessMessage('Successfully Added Coupon');
    this.router.navigate(['/admin/coupons']);
  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  public onCouponFormSubmit(): void {
    if (this.couponForm.valid) {
      const couponRequest: CouponRequest = this.getCouponRequestFromForm(this.couponForm);


      this.couponService.add(couponRequest).subscribe
      ((coupon: Coupon) => this.onUpdateCouponComplete(coupon),
        (error => this.onError(error)));


    }
  }

}

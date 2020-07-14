import {Component, OnDestroy, OnInit} from '@angular/core';
import {Coupon, STATUS} from './models/coupon.models';
import {CouponService} from './services/coupon.service';
import {PageRequest, PageResponse} from '../../_shared/_models/shared.models';
import {NotificationService} from '../../_shared/_services/notification.service';
import {Pageable, Product} from '../../products/models/product.models';
import {PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {ClipboardModule, Clipboard} from '@angular/cdk/clipboard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-coupons',
  templateUrl: './list-coupons.component.html',
  styleUrls: ['./list-coupons.component.scss']
})
export class ListCouponsComponent implements OnInit, OnDestroy {

  coupons: Coupon[];
  pageRequest: PageRequest;
  pageable: Pageable;
  couponsLoaded = false;
  counts: number[] = [10, 20, 30, 40];
  displayedColumns: string[] = ['id', 'name', 'amount', 'status', 'couponCode', 'Operations'];
  private subscription: Subscription;

  constructor(private couponService: CouponService, private router: Router, private notificationService: NotificationService, public clipboard: Clipboard) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.pageRequest = new PageRequest();
    this.reload();
  }

  reload() {
    this.couponsLoaded = false;
    this.subscription = this.couponService.getAll(this.pageRequest)
      .subscribe(
        couponResponse => this.onCouponDataRecieve(couponResponse),
        (error => this.onError(error)));
  }

  onCouponDataRecieve(couponPageResponse: PageResponse<Coupon>) {
    this.couponsLoaded = true;
    this.coupons = couponPageResponse.items;
    this.pageable = couponPageResponse.pageable;
  }

  onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  onPageChange(event: PageEvent) {

    this.pageRequest.pageSize = event.pageSize;
    this.pageRequest.pageNo = event.pageIndex;
    this.reload();

  }

  copyCoupon(code: string) {

    if (this.clipboard.copy(code)) {
      this.notificationService.showSuccessMessage('Coupon Copied to clipboard');
    } else {
      this.notificationService.showErrorMessage('Unable to copy Coupon');
    }


  }


  onDeleteCouponComplete(value) {
    this.notificationService.showSuccessMessage('Successfully Removed Coupon');
    this.reload();
  }

  deleteCoupon(coupon: Coupon) {

    this.couponService.delete(coupon.id)
      .subscribe(value => this.onDeleteCouponComplete(value),
        (error => this.onError(error)));

  }

  delete(coupon: Coupon) {

    this.notificationService.confirm('Do you want to Delete ?')
      .then((res) => {

        this.deleteCoupon(coupon);
      });


  }

  add() {
    this.router.navigate(['/admin/coupons/add']);

  }
}

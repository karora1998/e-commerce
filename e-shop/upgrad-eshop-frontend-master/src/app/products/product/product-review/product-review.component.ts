import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../models/product.models';
import {ReviewService} from './services/review.service';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {getUser} from '../../../_shared/_helpers/auth.utils';
import {Review} from './models/review.models';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit, OnDestroy {

  @Input() product: Product;

  private reviewSubscription: Subscription;

  reviews: Review[];
  userName: string;
  canShowAddReview = false;


  constructor(private reviewService: ReviewService, private notificationService: NotificationService, private appDataService: AppDataService) {


  }

  ngOnInit(): void {
    this.appDataService.showLoading();

    this.appDataService.authInfo$.subscribe(authInfo => {

      const user = getUser(authInfo);


      if (user && user.userName) {
        this.userName = user.userName;
        this.canShowAddReview = true;
      } else {
        this.userName = null;
      }


    });
    this.reloadReviews();
  }

  reloadReviews() {
    if(!this.product)
      return

    this.reviewSubscription = this.reviewService.getProductReviews(this.product).subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }

  onDataReceived(reviews: Review[]) {
    this.appDataService.hideLoading();
    this.reviews = reviews;
  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }


  private onDeleteComplete(value) {

    this.notificationService.showSuccessMessage('Successfully Deleted Review');
    this.reloadReviews();
  }

  private onDeleteError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  delete(review: Review) {

    this.reviewService.delete(this.product.productId)
      .subscribe(value => this.onDeleteComplete(value),
        (error => this.onDeleteError(error)));
  }

  ngOnDestroy(): void {
    this.reviewSubscription.unsubscribe();
  }

  onAddReviewComplete() {
    this.reloadReviews();
    this.canShowAddReview = false;
    setTimeout(() => {
      this.canShowAddReview = true;
    }, 3000);
  }
}

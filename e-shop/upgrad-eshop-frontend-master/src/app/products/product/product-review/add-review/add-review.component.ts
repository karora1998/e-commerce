import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ManageProductService} from '../../../../inventorymanager/products/services/manage-product.service';
import {ManageDealService} from '../../../../inventorymanager/products/services/manage-deal.service';
import {NotificationService} from '../../../../_shared/_services/notification.service';
import {Product} from '../../../models/product.models';
import {ProductRequest} from '../../../../inventorymanager/products/_helpers/manage-product.models';
import {Review, ReviewRequest} from '../models/review.models';
import {
  getDealRequestFromForm,
  getFormControlsConfigForProduct,
  getProductRequestFromForm
} from '../../../../inventorymanager/products/_helpers/product.utils';
import {ReviewService} from '../services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  addReviewForm: FormGroup;

  @Input() product: Product;
  @Output() onComplete: EventEmitter<Review> = new EventEmitter();


  constructor(public formBuilder: FormBuilder, private router: Router, private reviewService: ReviewService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  this.resetForm();

  }

resetForm(){
    if(this.product)
  this.addReviewForm = this.formBuilder.group(this.getFormControlsConfigForReview(this.product.productId));
}
  getFormControlsConfigForReview(productId) {

    return {
      productId: [productId, Validators.compose([])],
      rating: ['', Validators.compose([Validators.required, Validators.min(1)])],
      comment: ['', Validators.compose([Validators.required, Validators.minLength(5)])],

    };
  }


  getRatingRequestFromForm() {
    return new ReviewRequest({
      comment: this.addReviewForm.controls.comment.value,
      productId: this.addReviewForm.controls.productId.value,
      rating: this.addReviewForm.controls.rating.value
    });
  }


  updateStar(stars: any) {
    this.addReviewForm.controls.rating.setValue(stars);
  }


  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  private onUpdateReviewComplete(review: Review) {


    this.notificationService.showSuccessMessage('Successfully Added review');
    this.onComplete.emit(review);

  }

  public onAddReviewFormSubmit(): void {
    if (this.addReviewForm.valid) {
      const reviewRequest: ReviewRequest = this.getRatingRequestFromForm();


      this.reviewService.add(reviewRequest).subscribe
      ((review: Review) => this.onUpdateReviewComplete(review),
        (error => this.onError(error)));


    }
  }


}

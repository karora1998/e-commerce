import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {NotificationService} from '../../../_shared/_services/notification.service';


import {ManageProductService} from '../services/manage-product.service';
import {Deal, Product} from '../../../products/models/product.models';
import {ProductRequest} from '../_helpers/manage-product.models';
import {
  createEmptyProductObject,
  getDealRequestFromForm,
  getFormControlsConfigForProduct,
  getProductRequestFromForm
} from '../_helpers/product.utils';
import {ManageDealService} from '../services/manage-deal.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, private manageProductService: ManageProductService, private manageDealService: ManageDealService, private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.initForm(createEmptyProductObject());
  }

  initForm(product: Product): void {
    this.productForm = this.formBuilder.group(getFormControlsConfigForProduct(product));

  }


  private redirectBack() {
    this.router.navigate(['/manager/products']);
  }

  private onUpdateDealComplete(deal: Deal) {

    this.notificationService.showSuccessMessage('Successfully Added Product With Deal');
    this.redirectBack();

  }


  private updateDeal(dealRequest) {


    this.manageDealService.add(dealRequest).subscribe
    ((deal: Deal) => this.onUpdateDealComplete(deal),
      (error => this.onError(error)));

  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }



  private onUpdateProductComplete(product: Product) {

    const dealRequest = getDealRequestFromForm(product.productId, this.productForm);

    if (dealRequest.price > 0) {
      this.updateDeal(dealRequest);
    } else {
      this.notificationService.showSuccessMessage('Successfully Added Product');
      this.redirectBack();
    }
  }
  public onProductFormSubmit(): void {
    if (this.productForm.valid) {
      const productRequest: ProductRequest = getProductRequestFromForm(this.productForm);


      this.manageProductService.add(productRequest).subscribe
      ((product: Product) => this.onUpdateProductComplete(product),
        (error => this.onError(error)));


    }
  }

}

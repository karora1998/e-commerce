import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageProductService} from '../services/manage-product.service';
import {ManageDealService} from '../services/manage-deal.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {
  createEmptyProductObject,
  getDealRequestFromForm,
  getFormControlsConfigForProduct,
  getProductRequestFromForm
} from '../_helpers/product.utils';
import {Deal, Product} from '../../../products/models/product.models';
import {ProductRequest} from '../_helpers/manage-product.models';
import {onStateVariablesReceive} from '../../../_shared/_helpers/router.utils';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId: any;
  isLoaded = false;
  productForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, private manageProductService: ManageProductService, private manageDealService: ManageDealService, private notificationService: NotificationService) {
  }


  ngOnInit(): void {


    onStateVariablesReceive(this.activatedRoute).subscribe((res) => {
      this.onParameterLoaded(res);
    }, (error => console.log(error)));

  }


   onParameterLoaded(res: any) {


    if (res && res.product) {
      const product = res.product;
      this.productId = product.productId;
      this.initForm(product);
      this.isLoaded = true;
    }
  }

  initForm(product: Product): void {
    this.productForm = this.formBuilder.group(getFormControlsConfigForProduct(product));

  }


  private onUpdateProductComplete(product: Product) {

    const dealRequest = getDealRequestFromForm(product.productId, this.productForm);

    if (dealRequest.price > 0) {
      this.updateDeal(dealRequest);
    } else {
      this.notificationService.showSuccessMessage('Successfully Updated Product');
      this.redirectBack();
    }
  }

  private redirectBack() {
    this.router.navigate(['/manager/products']);
  }

  private onUpdateDealComplete(deal: Deal) {

    this.notificationService.showSuccessMessage('Successfully Updated Product With Deal');
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


  public onProductFormSubmit(): void {
    if (this.productForm.valid) {
      const productRequest: ProductRequest = getProductRequestFromForm(this.productForm);


      this.manageProductService.update(this.productId, productRequest).subscribe
      ((product: Product) => this.onUpdateProductComplete(product),
        (error => this.onError(error)));


    }
  }

}

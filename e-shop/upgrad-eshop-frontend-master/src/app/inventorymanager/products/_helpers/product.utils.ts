import {FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../products/models/product.models';
import {DealRequest, ProductRequest} from './manage-product.models';

export function getFormControlsConfigForProduct(product: Product) {

  return {
    name: [product.name, Validators.compose([Validators.required, Validators.minLength(3)])],
    category: [product.category, Validators.compose([Validators.required, Validators.minLength(3)])],
    price: [product.price, Validators.compose([Validators.required, Validators.min(1)])],
    dealPrice: [product.dealPrice, Validators.compose([])],
    description: [product.description, Validators.compose([Validators.required])],
    manufacturer: [product.manufacturer, Validators.compose([Validators.required])],
    imageUrl: [product.imageUrl, Validators.compose([])],
    availableItems: [product.availableItems, Validators.compose([Validators.required, Validators.min(1)])]

  };
}


export function getProductRequestFromForm(formGroup: FormGroup) {
  return new ProductRequest({
    name: formGroup.controls.name.value,
    availableItems: formGroup.controls.availableItems.value,
    category: formGroup.controls.category.value,
    description: formGroup.controls.description.value,
    imageUrl: formGroup.controls.imageUrl.value,
    manufacturer: formGroup.controls.manufacturer.value,
    price: formGroup.controls.price.value,
  });
}


export function getDealRequestFromForm(productId: number, formGroup: FormGroup) {


  return new DealRequest({
    productId,
    price: formGroup.controls.dealPrice.value
  });
}


export function createEmptyProductObject() {
  // if (1 === 1) {
  //   return createAProductObject();
  // }

  return new Product({
    name: '',
    category: '',
    price: 0,
    dealPrice: 0,
    description: '',
    manufacturer: '',
    imageUrl: '',
    availableItems: 1

  });
}


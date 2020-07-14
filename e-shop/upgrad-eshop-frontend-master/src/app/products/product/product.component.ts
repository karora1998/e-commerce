import {Component, OnInit} from '@angular/core';
import {Product, ProductSearchRequest} from '../models/product.models';
import {Observable} from 'rxjs';
import {ProductService} from '../services/product.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  product: Product;
  productLoaded = false;

  constructor(private productService: ProductService, private appDataService: AppDataService, private notificationService: NotificationService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {


      if (params.has('id')) {
        this.reload(params.get('id'));
      }


    });


  }

  onDataReceived(value: Product) {
    this.appDataService.hideLoading();
    this.product = value;
    this.productLoaded = true;

  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }

  public getDiscount(): number {

    if (this.product.dealPrice > 0) {
      return this.product.price - this.product.dealPrice;
    } else {
      return 0;
    }

  }

  reload(id) {

    this.productLoaded = false;
    this.appDataService.showLoading();

    this.productService.byId(id).subscribe(
      value => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }

}

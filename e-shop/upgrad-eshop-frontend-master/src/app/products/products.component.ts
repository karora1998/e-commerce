import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from './services/product.service';
import {Subscription} from 'rxjs';
import {Pageable, Product, ProductResponse, ProductSearchRequest} from './models/product.models';
import {NotificationService} from '../_shared/_services/notification.service';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AppDataService} from '../_shared/_services/app-data.service';
import {onUrlChange} from '../_shared/_helpers/router.utils';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private productSearchSubscription: Subscription;
  productsLoaded: boolean = false;
  products: Product[];
  pageable: Pageable;
  productSearchRequest: ProductSearchRequest;
  counts: number[] = [10, 20, 30, 40];


  constructor(private productService: ProductService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }


  ngOnInit(): void {


    this.productSearchRequest = new ProductSearchRequest();
    this.extractParametersAndLoadProducts();

    onUrlChange(this.router).subscribe(() => {
      this.extractParametersAndLoadProducts();
    });

  }


  private extractParametersAndLoadProducts() {

    this.route.paramMap.subscribe(params => {


      if (params.has('category')) {
        this.productSearchRequest.category = params.get('category');
      }

      if (params.has('search')) {
        this.productSearchRequest.name = params.get('search');
      }

      this.reload();

    });
  }

  reload() {

    this.productsLoaded = false;
    this.appDataService.showLoading();
    this.productSearchSubscription = this.productService.search(this.productSearchRequest).subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }

  onDataReceived(productResponse: ProductResponse) {
    this.productsLoaded = true;
    this.appDataService.hideLoading();
    this.products = productResponse.products;
    this.pageable = productResponse.pageable;
  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }

  ngOnDestroy(): void {

    this.productSearchSubscription.unsubscribe();
  }


  reloadBasedOnSort(sortInfo) {
    this.productSearchRequest.sortBy = sortInfo.sortBy;
    this.productSearchRequest.direction = sortInfo.direction;
    this.reload();
  }

  onPageChange(event: PageEvent) {

    this.productSearchRequest.pageSize = event.pageSize;
    this.productSearchRequest.pageNo = event.pageIndex ;
    this.reload();

  }

  reloadBasedOnRating($event: any) {
    this.productSearchRequest.overAllRating = $event;
    this.reload();

  }
}

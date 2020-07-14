import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Pageable, Product, ProductResponse, ProductSearchRequest} from '../../products/models/product.models';
import {ProductService} from '../../products/services/product.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {onUrlChange} from '../../_shared/_helpers/router.utils';
import {PageEvent} from '@angular/material/paginator';
import {ManageDealService} from './services/manage-deal.service';
import {ManageProductService} from './services/manage-product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  private productSearchSubscription: Subscription;
  productsLoaded = false;
  products: Product[];
  pageable: Pageable;
  productSearchRequest: ProductSearchRequest;
  pageSizeOptions: number[] = [10, 20, 30, 40];


  constructor(private productService: ProductService, private manageDealService: ManageDealService, private manageProductService: ManageProductService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }


  ngOnInit(): void {


    this.productSearchRequest = new ProductSearchRequest();


    this.reload();

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
    this.productSearchRequest.pageNo = event.pageIndex;
    this.reload();

  }

  reloadBasedOnRating($event: any) {
    this.productSearchRequest.overAllRating = $event;
    this.reload();

  }

  onRemoveDealComplete(value) {
    this.notificationService.showSuccessMessage('Successfully Removed Deal');
    this.reload();
  }

  onRemoveDeal(product: Product) {

    this.manageDealService.delete(product.productId)
      .subscribe(value => this.onRemoveDealComplete(value),
        (error => this.onError(error)));

  }

  onEdit(product: Product) {

    this.router.navigateByUrl('/manager/products/edit', {state: {product}});
  }

  add() {
    this.router.navigate(['/manager/products/add']);
  }

  onDeleteProductComplete(value) {
    this.notificationService.showSuccessMessage('Successfully Deleted Product');
    this.reload();
  }

  deleteProduct(product: Product) {


    this.manageProductService.delete(product.productId)
      .subscribe(value => this.onDeleteProductComplete(value),
        (error => this.onError(error)));
  }


  onDelete(product: Product) {
    this.notificationService.confirm('Do you want to Delete ?')
      .then((res) => {

        this.deleteProduct(product);
      });
  }

}

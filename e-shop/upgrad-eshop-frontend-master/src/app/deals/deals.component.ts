import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {NotificationService} from '../_shared/_services/notification.service';
import {AppDataService} from '../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {DealService} from './services/deal.service';
import {PageRequest, PageResponse} from '../_shared/_models/shared.models';
import {Pageable, Product} from '../products/models/product.models';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit, OnDestroy {

  private dealSubscription: Subscription;
  dealsLoaded = false;
  pageRequest: PageRequest;
  products: Product[];
  pageable: Pageable;
  counts: number[] = [10, 20, 30, 40];


  constructor(private dealService: DealService, private notificationService: NotificationService, private appDataService: AppDataService, private route: ActivatedRoute, private router: Router) {


  }


  ngOnInit(): void {

    this.pageRequest = new PageRequest({});
    this.reload();

  }


  reload() {

    this.dealsLoaded = false;
    this.appDataService.showLoading();
    this.dealSubscription = this.dealService.getAll(this.pageRequest).subscribe(
      (value) => this.onDataReceived(value),
      (error) => this.onError(error)
    );
  }

  onDataReceived(dealResponse: PageResponse<Product>) {
    this.dealsLoaded = true;
    this.appDataService.hideLoading();
    this.products = dealResponse.items;
    this.pageable = dealResponse.pageable;
  }

  onError(error: any) {
    this.appDataService.hideLoading();
    this.notificationService.showErrorMessage(error);

  }

  ngOnDestroy(): void {

    this.dealSubscription.unsubscribe();
  }


  onPageChange(event: PageEvent) {

    this.pageRequest.pageSize = event.pageSize;
    this.pageRequest.pageNo = event.pageIndex;
    this.reload();

  }


}

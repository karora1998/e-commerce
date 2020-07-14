import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProductsComponent} from './products.component';
import {ProductService} from './services/product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {environment} from '../../environments/environment';

import {ProductItemThumbnailComponent} from './product-item-thumbnail/product-item-thumbnail.component';
import {ProductListHeaderComponent} from './product-list-header/product-list-header.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {getActivatedRouteStubFor, getNotificationService} from '../_mocks/utils.mock';
import {MatMenuModule} from '@angular/material/menu';
import {PageEvent} from '@angular/material/paginator';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {mockproductResponse} from '../_mocks/product.mocks';
import {NotificationService} from '../_shared/_services/notification.service';


describe('ProductsComponent With Empty Paramenters', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const activatedRouteStub = getActivatedRouteStubFor({});

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, MatMenuModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductsComponent, ProductListHeaderComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('Integrated Tests - Product Component', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let nativeElement: HTMLElement;
  let httpMock: any;
  const activatedRouteStub = getActivatedRouteStubFor({});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductsComponent, ProductListHeaderComponent, ProductItemThumbnailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {


    fixture = TestBed.createComponent(ProductsComponent);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;

  }));


  it('should display list of products,after service emits data', fakeAsync(() => {

    const resultsPerPage = 10;
    const url = environment.baseUrl + '/products?pageNo=0&pageSize=' + resultsPerPage + '&direction=DESC';
    loadMockDataFor(url, mockproductResponse);

    const results: NodeListOf<any> = nativeElement.querySelectorAll('app-product-item-thumbnail');
    expect(results.length).toEqual(resultsPerPage);

    httpMock.verify();

  }));

  function loadMockDataFor(url: string, body) {
    const mockReq = httpMock.expectOne(url);
    mockReq.flush(body);
    flushMicrotasks();
    fixture.detectChanges();

  }

  it('calling reloadBasedOnSort should reload Data based on Sort Parameters', fakeAsync(() => {

    const resultsPerPage = 10;
    let url = environment.baseUrl + '/products?pageNo=0&pageSize=' + resultsPerPage + '&direction=DESC';
    loadMockDataFor(url, mockproductResponse);

    const sortInfo = {label: 'Price Lowest', sortBy: 'price', direction: 'ASC'};

    component.reloadBasedOnSort(sortInfo);

    url = environment.baseUrl + '/products?pageNo=0&pageSize=' + resultsPerPage + '&sortBy=' + sortInfo.sortBy + '&direction=' + sortInfo.direction;
    loadMockDataFor(url, mockproductResponse);

    httpMock.verify();

  }));
  it('calling reloadBasedOnRating should reload Data based on Rating Parameters', fakeAsync(() => {

    const resultsPerPage = 10;
    let url = environment.baseUrl + '/products?pageNo=0&pageSize=' + resultsPerPage + '&direction=DESC';
    loadMockDataFor(url, mockproductResponse);


    const rating = 3;
    component.reloadBasedOnRating(rating);


    url = environment.baseUrl + '/products?pageNo=0&pageSize=' + resultsPerPage + '&direction=DESC&overAllRating=' + rating;
    loadMockDataFor(url, mockproductResponse);


    httpMock.verify();

  }));
  it('calling onPageChange should increment page Number and reload Data', fakeAsync(() => {

    const resultsPerPage = 10;
    const firstPageNo = 0;

    let url = environment.baseUrl + '/products?pageNo=' + firstPageNo + '&pageSize=' + resultsPerPage + '&direction=DESC';
    loadMockDataFor(url, mockproductResponse);
    const secondPageNo = firstPageNo + 1;

    const pageInfo = new PageEvent();
    pageInfo.pageSize = resultsPerPage;
    pageInfo.pageIndex = secondPageNo;
    component.onPageChange(pageInfo);


    url = environment.baseUrl + '/products?pageNo=' + secondPageNo + '&pageSize=' + resultsPerPage + '&direction=DESC';
    loadMockDataFor(url, mockproductResponse);


    httpMock.verify();

  }));

});

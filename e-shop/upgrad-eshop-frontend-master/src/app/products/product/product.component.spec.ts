import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {getActivatedRouteStubFor, getNotificationService} from '../../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {environment} from '../../../environments/environment';
import {getAMockProduct, getMockProductWithDeal, getMockProductWithNoDeal} from '../../_mocks/product.mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationService} from '../../_shared/_services/notification.service';




describe('ProductComponent', () => {
  let productComponent: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;


  let nativeElement: HTMLElement;
  let httpMock: any;
  const productId = 1;
  const activatedRouteStub = getActivatedRouteStubFor({id: productId});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, MatSnackBarModule, MatMenuModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductComponent],
      providers: [
        ProductService,
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {


    fixture = TestBed.createComponent(ProductComponent);
    httpMock = TestBed.get(HttpTestingController);
    productComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;

  }));

  const setupMocks = (aMockProduct) => {

    const url = environment.baseUrl + '/products/' + productId;
    const mockReq = httpMock.expectOne(url);
    mockReq.flush(aMockProduct);
    flushMicrotasks();
    fixture.detectChanges();
  };
  const expectProductStatusDisplayedEquals = (expectedProductStatus) => {

    const productStatus = nativeElement.querySelector('.product-status').textContent;
    expect(productStatus).toEqual(expectedProductStatus);

    httpMock.verify();

  };

  it('should display Prdouct Details and Display In Stock , If the available Items Greater than Zero,after service emits data', fakeAsync(() => {


    const expectedProductStatus = 'In stock';
    const aMockProduct = getAMockProduct();
    setupMocks(aMockProduct);
    expectProductStatusDisplayedEquals(expectedProductStatus);

  }));
  it('should display Prdouct Details and Display Unavailable , If the available Items Equals Zero', fakeAsync(() => {


    const aMockProduct = getAMockProduct();
    aMockProduct.availableItems = 0;
    setupMocks(aMockProduct);
    const expectedProductStatus = 'Unavailable';
    expectProductStatusDisplayedEquals(expectedProductStatus);


  }));

  it('should display Both prices and discount, If there is a Deal', fakeAsync(() => {


    const aMockProduct = getMockProductWithDeal();

    setupMocks(aMockProduct);

    const oldPriceElement = nativeElement.querySelector('.old-price');
    const newPriceElement = nativeElement.querySelector('.new-price');
    const discountContainerElement = nativeElement.querySelector('.discount-container');

    expect(newPriceElement).not.toBeNull();
    expect(oldPriceElement).not.toBeNull();
    expect(discountContainerElement).not.toBeNull();

    const discount = aMockProduct.price - aMockProduct.dealPrice;

    expect(discountContainerElement.textContent).toContain(discount.toString());


  }));

  it('should display Only price, If there is no  Deal', fakeAsync(() => {


    const aMockProduct = getMockProductWithNoDeal();

    setupMocks(aMockProduct);

    const oldPriceElement = nativeElement.querySelector('.old-price');
    const newPriceElement = nativeElement.querySelector('.new-price');


    expect(newPriceElement).not.toBeNull();
    expect(oldPriceElement).toBeNull();


  }));

});

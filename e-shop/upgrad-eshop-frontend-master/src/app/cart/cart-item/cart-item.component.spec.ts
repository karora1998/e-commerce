import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {CartItemComponent} from './cart-item.component';
import {getNotificationService} from '../../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Location} from '@angular/common';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {productRoutes} from '../../products/products-routing.module';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getMockedValidAuthInfoForUser} from '../../_mocks/user.mocks';
import {
  getMockedCartItem,
  getMockedCartResponse,
  getMockedCartWithEmptyData,
  getMockedCartWithEmptyResponse,
  getUpdatedCartItemResponse
} from '../../_mocks/cart.mocks';
import {environment} from '../../../environments/environment';

describe('CartItemThumbnailComponent', () => {
  let component: CartItemComponent;

  let fixture: ComponentFixture<CartItemComponent>;

  let nativeElement: HTMLElement;

  let currentLocation: Location;
  let notificationService;
  let appDataService: AppDataService;

  let httpMock: any;
  const cartItem = getMockedCartItem();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(productRoutes)],
      declarations: [CartItemComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    currentLocation = TestBed.inject(Location);
    appDataService = TestBed.inject(AppDataService);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();
    spyOn(appDataService, 'loadCart').and.stub();
    spyOn(component.onRefreshCart, 'emit').and.stub();

    fixture.detectChanges();
  });


  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  function setSessionForLoggedInForUser() {

    appDataService.onUserLoggedIn(getMockedValidAuthInfoForUser());
    component.cartItem = cartItem;
    component.ngOnInit();
    fixture.detectChanges();

  }

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('updateQuantity should update the number of items in server', fakeAsync(() => {
    setSessionForLoggedInForUser();
    tick();
    const url = environment.baseUrl + '/cart';

    const updatedQuantity = 2;
    component.updateQuantity(updatedQuantity);
    loadMockDataFor(url, getUpdatedCartItemResponse(cartItem, updatedQuantity));
    flushMicrotasks();
    expect(notificationService.showErrorMessage).not.toHaveBeenCalled();

  }));
  it('server error while updating Quantity should throw error notification', fakeAsync(() => {
    setSessionForLoggedInForUser();
    tick();
    const url = environment.baseUrl + '/cart';

    const updatedQuantity = 2;
    component.updateQuantity(updatedQuantity);

    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();

  }));

  it('removeFromCart should remove the items from cart', fakeAsync(() => {
    setSessionForLoggedInForUser();
    tick();

    const url = environment.baseUrl + '/cart/' + cartItem.product.productId;

    component.delete();
    loadMockDataFor(url, getMockedCartWithEmptyResponse());
    flushMicrotasks();
    expect(component.onRefreshCart.emit).toHaveBeenCalled();

  }));
  it('server error while updating Quantity should throw error notification', fakeAsync(() => {
    setSessionForLoggedInForUser();
    tick();
    const url = environment.baseUrl + '/cart/' + cartItem.product.productId;

    component.delete();

    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();

  }));


});

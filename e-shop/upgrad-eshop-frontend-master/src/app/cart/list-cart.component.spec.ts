import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {ListCartComponent} from './list-cart.component';
import {getActivatedRouteStubFor, getNotificationService} from '../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {Location} from '@angular/common';
import {AppDataService} from '../_shared/_services/app-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {adminRoutes} from '../admin/admin-routing.module';
import {NotificationService} from '../_shared/_services/notification.service';
import {getMockedAllUserResponse, getMockedValidAuthInfoForAdmin, getMockedValidAuthInfoForUser} from '../_mocks/user.mocks';
import {environment} from '../../environments/environment';
import {getMockedCartResponse, getMockedCartWithData, getMockedCartWithEmptyData} from '../_mocks/cart.mocks';
import {getAsUser} from '../auth/models/auth.models';
import {productRoutes} from '../products/products-routing.module';

describe('ListCartComponent', () => {
  let component: ListCartComponent;

  let fixture: ComponentFixture<ListCartComponent>;

  let nativeElement: HTMLElement;

  let currentLocation: Location;
  let notificationService;
  let appDataService: AppDataService;

  let httpMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(productRoutes)],
      declarations: [ListCartComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCartComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    currentLocation = TestBed.inject(Location);
    appDataService = TestBed.inject(AppDataService);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();
    spyOn(appDataService, 'loadCart').and.stub();
    spyOn(component.onComplete, 'emit').and.stub();

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

  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function loadCartItems() {
    setSessionForLoggedInForUser();

    tick();
    fixture.detectChanges();
    const url = environment.baseUrl + '/cart';

    loadMockDataFor(url, getMockedCartResponse());
    flushMicrotasks();
  }

  it('by default should list all cart items', fakeAsync(() => {
    loadCartItems();
    expect(component.cartItems).toBeTruthy();
    expect(component.cartItems.length).toBeGreaterThan(0);


  }));

  it('if the cart service is down , it should throw error', fakeAsync(() => {

    setSessionForLoggedInForUser();

    tick();
    fixture.detectChanges();
    const url = environment.baseUrl + '/cart';


    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));

  it('clicking onCleanCart should clear cart and redirect to products', fakeAsync(() => {

    loadCartItems();


    component.onCleanCart();
    tick();
    const url = environment.baseUrl + '/cart';
    loadMockDataFor(url, 'Succesfully removed cart items');
    flushMicrotasks();

    expect(notificationService.showSuccessMessage).toHaveBeenCalled();

    expect(currentLocation.path()).toBe('/products');

  }));

  it('clicking onCleanCart , when server has error , should show error message ', fakeAsync(() => {

    loadCartItems();


    component.onCleanCart();
    tick();
    const url = environment.baseUrl + '/cart';
    throwMockErrorFor(url, 403, 'Unable to delete');
    flushMicrotasks();

    expect(notificationService.showErrorMessage).toHaveBeenCalled();

  }));

  it('onContinue should emit complete event ', fakeAsync(() => {

    loadCartItems();


    component.onContinue();

    flushMicrotasks();

    expect(component.onComplete.emit).toHaveBeenCalled();

  }));
  it('onDataReceived when empty cart item should redirect to products ', fakeAsync(() => {

    component.onDataReceived(getMockedCartWithEmptyData())

    tick()
    expect(currentLocation.path()).toBe('/products');
  }));

});

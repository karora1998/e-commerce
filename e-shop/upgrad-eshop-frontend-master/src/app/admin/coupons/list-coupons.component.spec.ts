import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {ListCouponsComponent} from './list-coupons.component';
import {getActivatedRouteStubFor, getClipboard, getNotificationService} from '../../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {NotificationService} from '../../_shared/_services/notification.service';
import {environment} from '../../../environments/environment';
import {getMockedLoginResponse, getMockedValidAuthInfoForAdmin, getMockedValidAuthInfoForUser} from '../../_mocks/user.mocks';
import {asQueryString} from '../../_shared/_helpers/string.utils';
import {getMockedAllCouponResponse} from '../../_mocks/coupon.mocks';
import {adminRoutes} from '../admin-routing.module';
import {Location} from '@angular/common';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {Clipboard} from '@angular/cdk/clipboard';

describe('ListCouponsComponent', () => {
  let component: ListCouponsComponent;
  let fixture: ComponentFixture<ListCouponsComponent>;
  const activatedRouteStub = getActivatedRouteStubFor({});
  let nativeElement: HTMLElement;
  let currentLocation: Location;
  let notificationService;
  let appDataService: AppDataService;

  let httpMock: any;
  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(adminRoutes)],
      declarations: [ListCouponsComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ListCouponsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    currentLocation = TestBed.inject(Location);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();
    fixture.detectChanges();
  });


  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  function setSessionForLoggedInForAdmin() {
    appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }

  it('by default should list all coupons', fakeAsync(() => {

    const url = environment.baseUrl + '/coupons' + asQueryString(component.pageRequest);

    loadMockDataFor(url, getMockedAllCouponResponse());
    flushMicrotasks();
    expect(component.coupons.length).toBeGreaterThan(0);


  }));

  it('if the coupon service is down , it should throw error', fakeAsync(() => {

    const url = environment.baseUrl + '/coupons' + asQueryString(component.pageRequest);

    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));

  function loadDefaultCoupons() {
    const url = environment.baseUrl + '/coupons' + asQueryString(component.pageRequest);
    loadMockDataFor(url, getMockedAllCouponResponse());
    flushMicrotasks();

  }

  it('delete should call delete the coupon and show success message', fakeAsync(() => {
    loadDefaultCoupons();

    const coupon = component.coupons[0];
    component.delete(coupon);
    tick();
    const url = environment.baseUrl + '/coupons/' + coupon.id;

    loadMockDataFor(url, 'Succesfully Deleted');
    flushMicrotasks();

    expect(notificationService.showSuccessMessage).toHaveBeenCalled();


  }));
  it('delete coupon on error should show error message', fakeAsync(() => {
    loadDefaultCoupons();

    const coupon = component.coupons[0];
    component.delete(coupon);
    tick();
    const url = environment.baseUrl + '/coupons/' + coupon.id;

    throwMockErrorFor(url, 403, 'Unable to delete');
    flushMicrotasks();

    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));
  it('reload should reload all', fakeAsync(() => {
    loadDefaultCoupons();
    component.reload();
    const url = environment.baseUrl + '/coupons' + asQueryString(component.pageRequest);
    loadMockDataFor(url, getMockedAllCouponResponse());
    flushMicrotasks();
    httpMock.verify();
  }));

  it('clicking add button should redirect', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    component.add();
    tick();

    expect(currentLocation.path()).toBe('/admin/coupons/add');
  }));
  it('page change should change page variable', fakeAsync(() => {

    loadDefaultCoupons();
    const currentPageSize = component.pageRequest.pageSize;
    const pageNo = component.pageRequest.pageNo;


    component.onPageChange({pageSize: 12, pageIndex: 3, length: 25});


    expect(pageNo).not.toBe(component.pageRequest.pageNo);
  }));


});


describe('ClipBoard and error handling', () => {
  let component: ListCouponsComponent;
  let fixture: ComponentFixture<ListCouponsComponent>;

  let notificationService;


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(adminRoutes)],
      declarations: [ListCouponsComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()},
        {provide: Clipboard, useValue: getClipboard()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCouponsComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.get(NotificationService);
    spyOn(notificationService, 'showErrorMessage').and.callThrough();
    spyOn(notificationService, 'showSuccessMessage').and.callThrough();
    fixture.detectChanges();
  });


  it('if clipboard copied , success message should be shown', fakeAsync(() => {

    component.copyCoupon('somexxxx');

    expect(notificationService.showSuccessMessage).toHaveBeenCalled();

  }));

  it('if clipboard copy throws error , error message should be shown', fakeAsync(() => {

    component.copyCoupon('error');
    tick();
    flushMicrotasks();

    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));


});

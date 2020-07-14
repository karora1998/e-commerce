import {ComponentFixture, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';
import {HttpTestingController} from '@angular/common/http/testing';
import {NotificationService} from '../_shared/_services/notification.service';
import {AppDataService} from '../_shared/_services/app-data.service';
import {getMockedValidAuthInfoForAdmin, getMockedValidAuthInfoForManager, getMockedValidAuthInfoForUser} from './user.mocks';
import {OnDestroy, OnInit} from '@angular/core';
import {ListProductsComponent} from '../inventorymanager/products/list-products.component';
import {getActivatedRouteStubFor} from './utils.mock';
import {ListCouponsComponent} from '../admin/coupons/list-coupons.component';

export class BaseTestComponent<T> {

  httpMock: any;
  component: T;
  fixture: ComponentFixture<T>;
  activatedRouteStub = getActivatedRouteStubFor({});
  nativeElement: HTMLElement;
  currentLocation: Location;
  notificationService;
  appDataService: AppDataService;


  setUpMocksForComponent(fixture) {
    this.fixture = fixture;

    this.component = this.fixture.componentInstance;
    this.nativeElement = this.fixture.debugElement.nativeElement;
    this.httpMock = TestBed.get(HttpTestingController);
    this.notificationService = TestBed.get(NotificationService);
    this.currentLocation = TestBed.inject(Location);
    spyOn(this.notificationService, 'showErrorMessage').and.stub();
    spyOn(this.notificationService, 'showSuccessMessage').and.stub();
    this.fixture.detectChanges();

  }

  loadMockDataFor(url: string, body) {
    const testRequest = this.httpMock.expectOne(url);
    testRequest.flush(body);
  }

  throwMockErrorFor(url, code, text) {
    this.httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  throwTechnicalErrorFor(url) {
    this.throwMockErrorFor(url, 500, 'Technical error');

  }

  setSessionForLoggedInForAdmin() {
    const appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());
    flushMicrotasks();

  }

  setSessionForLoggedInForManager() {
    const appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForManager());
    flushMicrotasks();

  }

  setSessionForLoggedInForUser() {
    const appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForUser());
    flushMicrotasks();
  }

  expectErrorNotificationShown() {
    expect(this.notificationService.showErrorMessage).toHaveBeenCalled();
  }

  expectSuccessNotificationShown() {
    expect(this.notificationService.showSuccessMessage).toHaveBeenCalled();
  }

  expectLocationToBe(someurl: string) {
    tick();
    expect(this.currentLocation.path()).toBe(someurl);
  }

  expectSuccessNotificationShownWithMessage(msg: string) {
    expect(this.notificationService.showSuccessMessage).toHaveBeenCalledWith(msg)
  }
}




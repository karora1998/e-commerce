import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import { DealsComponent } from './deals.component';
import {getActivatedRouteStubFor, getNotificationService} from '../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {AppDataService} from '../_shared/_services/app-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {productRoutes} from '../products/products-routing.module';
import {NotificationService} from '../_shared/_services/notification.service';
import {getMockedValidAuthInfoForUser} from '../_mocks/user.mocks';
import {approutes} from '../app-routing.module';
import {environment} from '../../environments/environment';
import {getMockedCartResponse} from '../_mocks/cart.mocks';
import {asQueryString} from '../_shared/_helpers/string.utils';
import {getMockedDealsResponse} from '../_mocks/deals.mocks';
import {PageEvent} from '@angular/material/paginator';

describe('DealsComponent', () => {
  let component: DealsComponent;

  let fixture: ComponentFixture<DealsComponent>;

  let nativeElement: HTMLElement;

  let currentLocation: Location;
  let notificationService;
  let appDataService: AppDataService;

  let httpMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(approutes)],
      declarations: [DealsComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    currentLocation = TestBed.inject(Location);
    appDataService = TestBed.inject(AppDataService);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();
    spyOn(appDataService, 'loadCart').and.stub();


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


  function loadDeals() {
    setSessionForLoggedInForUser();

    tick();
    fixture.detectChanges();

    const url = environment.baseUrl + '/deals' + asQueryString(component.pageRequest);

    loadMockDataFor(url, getMockedDealsResponse());
    flushMicrotasks();
  }

  it('by default should list all deals', fakeAsync(() => {
    loadDeals();


    expect(component.products).toBeTruthy();
    expect(component.products.length).toBeGreaterThan(0);


  }));
  it('if page changed', fakeAsync(() => {
    loadDeals();


    const pageInfo = new PageEvent();
    pageInfo.pageSize = 10;
    const pageIndex = 2;
    pageInfo.pageIndex = pageIndex;
    component.onPageChange(pageInfo);

    const url = environment.baseUrl + '/deals' + asQueryString(component.pageRequest);

    loadMockDataFor(url, getMockedDealsResponse());
    flushMicrotasks();


    expect(component.pageRequest.pageNo).toBe(pageIndex);


  }));

  it('if the deal service is down , it should throw error', fakeAsync(() => {

    setSessionForLoggedInForUser();

    tick();
    fixture.detectChanges();
    const url = environment.baseUrl + '/deals' + asQueryString(component.pageRequest);


    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));

});

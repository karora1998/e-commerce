import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {AddCouponComponent} from './add-coupon.component';
import {getActivatedRouteStubFor, getNotificationService} from '../../../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {getMockedValidAuthInfoForAdmin} from '../../../_mocks/user.mocks';
import {environment} from '../../../../environments/environment';
import {getMockedAddCouponResponse} from '../../../_mocks/coupon.mocks';
import {Location} from '@angular/common';
import {adminRoutes} from '../../admin-routing.module';
import {NotificationService} from '../../../_shared/_services/notification.service';

describe('AddCouponComponent', () => {
  let component: AddCouponComponent;
  let fixture: ComponentFixture<AddCouponComponent>;
  const activatedRouteStub = getActivatedRouteStubFor({});
  let httpMock: any;
  let currentLocation: Location;
  let notificationService;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(adminRoutes)],
      declarations: [AddCouponComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  function setSessionForLoggedInForAdmin() {
    const appDataService: AppDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponComponent);
    httpMock = TestBed.get(HttpTestingController);
    currentLocation = TestBed.inject(Location);
    notificationService = TestBed.get(NotificationService);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();

    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }


  it('should create', () => {
    setSessionForLoggedInForAdmin();
    expect(component).toBeTruthy();
  });
  it('should initialize form ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    expect(component.couponForm.controls.name).toBeTruthy();
  }));

  it('When adding coupon and if server returns proper response ,success message should be shown ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    const name = 'Happy coupon';
    component.couponForm.controls.name.setValue(name);
    const amount = 300;
    component.couponForm.controls.amount.setValue(amount);
    tick();
    component.onCouponFormSubmit();

    const url = environment.baseUrl + '/coupons';
    loadMockDataFor(url, getMockedAddCouponResponse(name, amount));
    flushMicrotasks();
    tick();
    expect(notificationService.showSuccessMessage).toHaveBeenCalled();


  }));
  it('When adding coupon and if server throws error ,error message should be shown  ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    const name = 'Happy coupon';
    component.couponForm.controls.name.setValue(name);
    const amount = 300;
    component.couponForm.controls.amount.setValue(amount);
    tick();
    component.onCouponFormSubmit();

    const url = environment.baseUrl + '/coupons';
    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    tick();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));
});

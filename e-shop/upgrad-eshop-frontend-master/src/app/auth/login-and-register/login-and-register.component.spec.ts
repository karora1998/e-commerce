import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoginAndRegisterComponent} from './login-and-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {getMockedValidAuthInfoForAdmin} from '../../_mocks/user.mocks';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getActivatedQueryParamsStubFor, getActivatedRouteStubFor, getNotificationService} from '../../_mocks/utils.mock';
import {adminRoutes} from '../../admin/admin-routing.module';
import {productRoutes} from '../../products/products-routing.module';
import {Location} from '@angular/common';

describe('LoginAndRegisterComponent', () => {
  let component: LoginAndRegisterComponent;
  let fixture: ComponentFixture<LoginAndRegisterComponent>;
  let currentLocation: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAndRegisterComponent],
      imports: [RouterTestingModule, UiElementsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(productRoutes)],
      providers: [

        {provide: ActivatedRoute, useValue: getActivatedQueryParamsStubFor({'redirectUrl': '/products/detail/39'})},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndRegisterComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.inject(Location);
    fixture.detectChanges();
  });

  function setSessionForLoggedInForAdmin() {
    const appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
  });
  it('should redirect to', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    expect(currentLocation.path()).toBe('/products/detail/39');
  }));
});
describe('LoginAndRegisterComponent with no redirect URL', () => {
  let component: LoginAndRegisterComponent;
  let fixture: ComponentFixture<LoginAndRegisterComponent>;
  let currentLocation: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAndRegisterComponent],
      imports: [RouterTestingModule, UiElementsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(productRoutes)],
      providers: [

        {provide: ActivatedRoute, useValue: getActivatedQueryParamsStubFor({})},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndRegisterComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.inject(Location);
    fixture.detectChanges();
  });

  function setSessionForLoggedInForAdmin() {
    const appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }


  it('should redirect to', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    expect(currentLocation.path()).toBe('/products');
  }));
});

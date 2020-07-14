import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {AddUserWithTypeComponent} from './add-user-with-type.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {getNotificationService} from '../../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {adminRoutes} from '../../admin-routing.module';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {getMockedUserDetailResponseForManager, getMockedValidAuthInfoForAdmin} from '../../../_mocks/user.mocks';
import {AdminService} from '../../services/admin.service';
import {environment} from '../../../../environments/environment';

describe('AddUserWithTypeComponent', () => {
  let component: AddUserWithTypeComponent;

  let fixture: ComponentFixture<AddUserWithTypeComponent>;
  let httpMock: any;
  let currentLocation: Location;
  let notificationService;
  let inventoryManagerRegisterUrl;
  let adminRegisterUrl;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(adminRoutes)],
      declarations: [AddUserWithTypeComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserWithTypeComponent);

    httpMock = TestBed.get(HttpTestingController);
    currentLocation = TestBed.inject(Location);
    notificationService = TestBed.get(NotificationService);

    const adminService = TestBed.inject(AdminService);
    inventoryManagerRegisterUrl = adminService.getInventoryManagerRegisterUrl();
    adminRegisterUrl = adminService.getAdminRegisterUrl();

    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setSessionForLoggedInForAdmin() {
    const appDataService: AppDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }

  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function initializeComponent() {
    const parameters = {title: 'Register New Manager', url: inventoryManagerRegisterUrl};
    component.onParameterLoaded(parameters);
  }

  it('should initialize form ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    initializeComponent();
    expect(component.registerForm.controls.firstName).toBeTruthy();
  }));

  function setupForms(userName, password) {


    component.registerForm.controls['userName'].setValue(userName);
    component.registerForm.controls['password'].setValue(password);
    component.registerForm.controls['email'].setValue(userName + '@test.com');
    component.registerForm.controls['firstName'].setValue('newUser');
    component.registerForm.controls['lastName'].setValue('LastNewUser');
    component.registerForm.controls['phoneNumber'].setValue('123456789');
    component.registerForm.controls['confirmPassword'].setValue('password');
  }

  it('When adding user and if server returns proper response ,success message should be shown ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    initializeComponent();
    tick();
    const userName = 'dummyuser';
    setupForms(userName, 'password');

    component.register();


    loadMockDataFor(inventoryManagerRegisterUrl, getMockedUserDetailResponseForManager(userName));
    flushMicrotasks();
    tick();
    expect(notificationService.showSuccessMessage).toHaveBeenCalled();


  }));

  it('When adding user and if server throws error ,error message should be shown ', fakeAsync(() => {
    setSessionForLoggedInForAdmin();
    tick();
    flushMicrotasks();
    initializeComponent();
    tick();
    const userName = 'dummyuser';
    setupForms(userName, 'password');

    component.register();

    throwMockErrorFor(inventoryManagerRegisterUrl, 500, 'Technical error');

    flushMicrotasks();
    tick();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));


});

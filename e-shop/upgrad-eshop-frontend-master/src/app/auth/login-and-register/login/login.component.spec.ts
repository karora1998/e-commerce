import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {LoginComponent} from './login.component';

import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {Location} from '@angular/common';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {By} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';
import {getMockedLoginResponse, getMockedUserDetailResponse} from '../../../_mocks/user.mocks';
import {Test} from 'tslint';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let nativeElement: HTMLElement;
  let appDataService;
  let httpMock: HttpTestingController;
  let currentLocation: Location;
  let notificationServiceSpy;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.get(Location);
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    appDataService=TestBed.inject(AppDataService);
    spyOn(appDataService, 'onUserLoggedIn').and.stub()
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();

  }));

  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }


  function setValueInForm(control: string, value) {
    component.loginForm.controls[control].setValue(value);
  }

  function setInputValueInHtml(selector: string, value: string) {
    const input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
  }


  function setupForms(userName, password) {

    const userNameControl = 'userName';
    setValueInForm(userNameControl, userName);
    component.loginForm.controls['password'].setValue(password);

  }

  it('login form should be valid for  valid Values', fakeAsync(() => {
    setupForms('newUser', 'password');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTrue();

  }));


  it('login form should throw error if password not equal', fakeAsync(() => {


    const userName = 'newUser';
    const password = 'password';
    setupForms(userName, password);
    fixture.detectChanges();
    setInputValueInHtml('[formcontrolname="password"]', '');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls.password.hasError('required')).toBeTrue();


  }));

  it('Login with valid values should call login API and update the configuration ', fakeAsync(() => {



    const userName = 'newUser';
    setupForms(userName, 'password');
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTrue();

    component.login()

    const getTokenUrl = environment.baseUrl + '/auth/login';
    const getUserDetailUrl = environment.baseUrl + '/users/details';


    loadMockDataFor(getTokenUrl, getMockedLoginResponse(userName));
    loadMockDataFor(getUserDetailUrl, getMockedUserDetailResponse(userName));
    flushMicrotasks();



  }));

  it('Login with invalid credentials, Notification should be shown ', fakeAsync(() => {


    const userName = 'newUser';
    setupForms(userName, 'password');
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTrue();

    component.login();

    const loginUrl = environment.baseUrl + '/auth/login';

    throwMockErrorFor(loginUrl, 403, 'Invalid Credentials');


    fixture.detectChanges();
    flushMicrotasks();

    expect(notificationServiceSpy).toHaveBeenCalled();

    httpMock.verify();
  }));


});

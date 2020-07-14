import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {RegisterComponent} from './register.component';

import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {By} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';
import {getMockedLoginResponse, getMockedUserDetailResponse} from '../../../_mocks/user.mocks';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {NotificationService} from '../../../_shared/_services/notification.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let nativeElement: HTMLElement;
  let appDataServiceSpy;
  let httpMock: HttpTestingController;
  let currentLocation: Location;
  let notificationServiceSpy;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [RegisterComponent],
      providers: [
        Location, AppDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.get(Location);
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
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
    component.registerForm.controls[control].setValue(value);
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
    component.registerForm.controls['password'].setValue(password);
    component.registerForm.controls['email'].setValue('test@test.com');
    component.registerForm.controls['firstName'].setValue('newUser');
    component.registerForm.controls['lastName'].setValue('LastNewUser');
    component.registerForm.controls['phoneNumber'].setValue('123456789');
    component.registerForm.controls['confirmPassword'].setValue('password');
  }

  it('register form should be valid for  valid Values', fakeAsync(() => {
    setupForms('newUser', 'password');
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeTrue();

  }));


  it('register form should throw error if password not equal', fakeAsync(() => {


    const userName = 'newUser';
    const password = 'password';
    setupForms(userName, password);
    fixture.detectChanges();
    setInputValueInHtml('[formcontrolname="confirmPassword"]', '');
    setInputValueInHtml('[formcontrolname="userName"]', '');
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeFalsy();
    expect(component.registerForm.controls.confirmPassword.hasError('mismatchedPasswords')).toBeTrue();
    expect(component.registerForm.controls.userName.hasError('required')).toBeTrue();


  }));

  it('Registering new User with valid values should call register API and update the configuration ', fakeAsync(() => {

    appDataServiceSpy = spyOn(TestBed.get(AppDataService), 'onUserLoggedIn').and.callThrough();

    const userName = 'newUser';
    setupForms(userName, 'password');
    fixture.detectChanges();
    expect(component.registerForm.valid).toBeTrue();

    component.register();

    const registerUrl = environment.baseUrl + '/auth/register';
    const getTokenUrl = environment.baseUrl + '/auth/login';
    const getUserDetailUrl = environment.baseUrl + '/users/details';


    loadMockDataFor(registerUrl, getMockedUserDetailResponse(userName));
    loadMockDataFor(getTokenUrl, getMockedLoginResponse(userName));
    loadMockDataFor(getUserDetailUrl, getMockedUserDetailResponse(userName));
    flushMicrotasks();
    expect(appDataServiceSpy).toHaveBeenCalled();

  }));

  it('Registering new User and if server throws error, Notification should be shown ', fakeAsync(() => {


    const userName = 'newUser';
    setupForms(userName, 'password');
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeTrue();

    component.register();

    const registerUrl = environment.baseUrl + '/auth/register';

    throwMockErrorFor(registerUrl, 403, 'User Already Registered');


    fixture.detectChanges();
    flushMicrotasks();

    expect(notificationServiceSpy).toHaveBeenCalled();

    httpMock.verify();
  }));


});

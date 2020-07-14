import {async, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {AuthInfo, LoginRequest, RegisterRequest} from '../models/auth.models';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {getMockedLoginResponse, getMockedUserDetailResponse} from '../../_mocks/user.mocks';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  it('should Login for valid  credentials', fakeAsync(() => {

    const getTokenUrl = environment.baseUrl + '/auth/login';
    const getUserDetailUrl = environment.baseUrl + '/users/details';


    const userName = 'user';
    const loginRequest: LoginRequest = new LoginRequest({password: 'password', userName});


    let loginResponse = null;


    service.login(loginRequest).subscribe((response: AuthInfo) => {
      loginResponse = response;
    });

    loadMockDataFor(getTokenUrl, getMockedLoginResponse(userName));
    loadMockDataFor(getUserDetailUrl, getMockedUserDetailResponse(userName));
    flushMicrotasks();

    expect(loginResponse).not.toBeNull();
    expect(loginResponse.user.userName).toBe(userName);

  }));


  it('should throw error , if logged in with Invalid credentials', fakeAsync(() => {

    const getTokenUrl = environment.baseUrl + '/auth/login';


    const userName = 'invaliduser';
    const loginRequest: LoginRequest = new LoginRequest({password: 'password', userName});


    let loginResponse = null;
    let loginError = null;

    service.login(loginRequest).subscribe((response: AuthInfo) => {
      loginResponse = response;
    }, (error) => {

      loginError = error;
    });

    throwMockErrorFor(getTokenUrl, 403, 'Bad Credentials');

    flushMicrotasks();


    expect(loginResponse).toBe(null);
    expect(loginError).not.toBe(null);

  }));


  it('should Register User for valid data', fakeAsync(() => {


    const registerRequest: RegisterRequest = new RegisterRequest({
      email: 'newusera@upgrad.com',
      firstName: 'MK',
      lastName: 'Gandhi',
      password: 'password',
      phoneNumber: '+91988989232',
      userName: 'newusera'
    });


    let registerResponse = null;

    service.register(registerRequest).subscribe((response: AuthInfo) => {
      console.log("authinfo received",response )
      registerResponse = response;
    });
    const getRegisterUrl = environment.baseUrl + '/auth/register';
    const getTokenUrl = environment.baseUrl + '/auth/login';
    const getUserDetailUrl = environment.baseUrl + '/users/details';



    loadMockDataFor(getRegisterUrl, getMockedUserDetailResponse(registerRequest.userName));
    loadMockDataFor(getTokenUrl, getMockedLoginResponse(registerRequest.userName));
    loadMockDataFor(getUserDetailUrl, getMockedUserDetailResponse(registerRequest.userName));
    flushMicrotasks();
    tick()
    expect(registerResponse).not.toBeNull();
    console.log(registerResponse)
    expect(registerResponse.user.userName).toBe(registerRequest.userName);


  }));



});

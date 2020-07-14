import {fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {HttpAuthInterceptor} from './http-auth.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppDataService} from '../_services/app-data.service';
import {UserService} from '../../users/services/user.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {getMockedValidAuthInfo} from '../../_mocks/user.mocks';
import {environment} from '../../../environments/environment';

describe('HttpAuthInterceptor', () => {

  let appDataService: AppDataService;
  let userService: UserService;
  let httpMock;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      UserService,
      AppDataService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpAuthInterceptor,
        multi: true,
      },
    ]
  }));

  beforeEach(() => {
    appDataService = TestBed.inject(AppDataService);
    userService = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should receive Authentication header if user logged in', fakeAsync(() => {


    const mockedValidAuthInfo = getMockedValidAuthInfo();
    appDataService.onUserLoggedIn(mockedValidAuthInfo);


    userService.getMyDetails().subscribe(value => {

    })

    //Write expectOne After request has been fired
    const url = environment.baseUrl + '/users/details';
    const httpRequest = httpMock.expectOne(url);

    flushMicrotasks();




    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toContain(mockedValidAuthInfo.token);


  }));

  it('should not receive Authentication header if user not logged in', fakeAsync(() => {



    appDataService.onUserLoggedIn(null);


    userService.getMyDetails().subscribe(value => {

    })

    //Write expectOne After request has been fired
    const url = environment.baseUrl + '/users/details';
    const httpRequest = httpMock.expectOne(url);

    flushMicrotasks();




    expect(httpRequest.request.headers.has('Authorization')).not.toEqual(true);



  }));
});

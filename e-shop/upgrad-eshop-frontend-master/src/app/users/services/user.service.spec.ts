import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ChangePasswordRequest} from '../models/user.models';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {HttpAuthInterceptor} from '../../_shared/_interceptors/http-auth.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getMockedLoginResponse} from '../../_mocks/user.mocks';
import {environment} from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpAuthInterceptor,
          multi: true,
        },
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }


  it('Password should be changed', (done) => {

    const changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest({
      'oldPassword': 'password2',
      'password': 'password'
    });


    service.changePassword(changePasswordRequest).subscribe(
      (response) => {
        console.log(response);
        expect(response).not.toBeNull();
        done();
      },
      (error) => {
        console.log(error);
        expect(error).toBeNull();
        done();

      }
    );
    const url = environment.baseUrl + '/users/changepassword';

    loadMockDataFor(url, 'Password Changed');
    httpMock.verify();

  });
});

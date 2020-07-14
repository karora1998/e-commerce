import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {AppDataService} from './app-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {getMockedProductService, mockCategories} from '../../_mocks/product.mocks';
import {clearLoginToken, retrieveLoginToken, saveLoginToken} from '../_helpers/storage.utils';
import {AuthService} from '../../auth/services/auth.service';
import {getMockedAuthService} from '../../_mocks/auth.mocks';
import {CartService} from '../../cart/services/cart.service';
import {getMockedCartService} from '../../_mocks/cart.mocks';
import {ProductService} from '../../products/services/product.service';
import {getMockedValidAuthInfoForUser} from '../../_mocks/user.mocks';

describe('AppDataService', () => {
  let service: AppDataService;

  let httpMock;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(AppDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve Categories when get Categories is called', (done) => {

    service.loadCategories();
    const url = environment.baseUrl + '/products/categories';
    httpMock.expectOne(url).flush(mockCategories);
    service.categories$.subscribe((response: string[]) => {
      expect(response).not.toBeNull();
      expect(response.length).toBeGreaterThan(0);

      done();
    });

  });


});


describe('AppDataService with mocked services', () => {
  let service: AppDataService;

  let httpMock;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthService, useValue: getMockedAuthService()},
        {provide: CartService, useValue: getMockedCartService()},
        {provide: ProductService, useValue: getMockedProductService()},
      ]
    });
    service = TestBed.inject(AppDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('Load User should retrieve token and get details from Auth service', fakeAsync(() => {

    saveLoginToken('somexxx');

    service.loadUser();

    tick();
    flushMicrotasks();

    let count;
    service.cartItemsCount$.subscribe(value => {
      count = value;
    });

    flushMicrotasks();
    expect(count).toBeGreaterThan(0);


  }));
  it('Clearing cart  should set cart Item zero', fakeAsync(() => {

    saveLoginToken('somexxx');

    service.loadUser();


    let count;
    service.cartItemsCount$.subscribe(value => {
      count = value;
    });

    flushMicrotasks();
    expect(count).toBeGreaterThan(0);

    service.clearCart();
    flushMicrotasks();
    expect(count).toBe(0);


  }));
  it('Update Profile detail should update user details', fakeAsync(() => {


    let authInfo;
    service.authInfo$.subscribe(value => {
      authInfo = value;
    });

    const mockedValidAuthInfo = getMockedValidAuthInfoForUser();
    service.onUpdateProfileDetails(mockedValidAuthInfo.user, mockedValidAuthInfo.token);


    flushMicrotasks();
    expect(authInfo).toBeTruthy();


  }));

  it('initializeApp should update user and update categories', fakeAsync(() => {

    saveLoginToken('somexxx');

    service.initializeApp();


    let categories: string[];
    service.categories$.subscribe(value => {
      categories = value;
    });

    flushMicrotasks();
    expect(categories.length).toBeGreaterThan(0);


  }));

  it('if token is invalid , it should sign out and clear token', fakeAsync(() => {

    saveLoginToken('error');

    service.loadUser();
    flushMicrotasks();
    expect(retrieveLoginToken()).toBeNull();


  }));
  it('calculate cout should return zero ,if cart is null', (() => {


    expect(service.calculateCount(null)).toBe(0);


  }));


  it('if no token found , cartitem count should be set empty', fakeAsync(() => {

    clearLoginToken();

    service.loadUser();

    let count;
    service.cartItemsCount$.subscribe(value => {
      count = value;
    });

    flushMicrotasks();
    expect(count).toBe(0);

    expect(retrieveLoginToken()).toBeNull();


  }));

});

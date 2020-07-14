import {async, fakeAsync, TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientModule} from '@angular/common/http';
import {ProductResponse, ProductSearchRequest} from '../models/product.models';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../auth/services/auth.service';
import {getMockedLoginResponse} from '../../_mocks/user.mocks';
import {environment} from '../../../environments/environment';
import {mockproductResponse} from '../../_mocks/product.mocks';
import {asQueryString} from '../../_shared/_helpers/string.utils';

describe('ProductService', () => {


  function loadMockDataFor(url: string, body) {


    const testRequest = httpMock.expectOne(url);

    console.log('sending  for ' + url + ' with ', body);
    testRequest.flush(body);


  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});


  }


  let httpMock: any;
  let service;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(ProductService);
  });


  it('should retrieve Products when searched', fakeAsync(() => {


    const productSearchRequest: ProductSearchRequest = new ProductSearchRequest();
    const url = environment.baseUrl + '/products' + asQueryString(productSearchRequest);
    let response;

    service.search(productSearchRequest).subscribe((productResponse: ProductResponse) => {
      response = productResponse;
    });


    loadMockDataFor(url, mockproductResponse);

    console.log(response);
    expect(response).not.toBeNull();
    expect(response.products.length).toBeGreaterThan(0);
    expect(response.pageable.totalPages).toBeGreaterThan(0);


  }));


});

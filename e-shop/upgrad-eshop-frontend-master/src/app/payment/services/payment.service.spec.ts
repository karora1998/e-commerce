import {async, TestBed} from '@angular/core/testing';

import { PaymentService } from './payment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReviewService} from '../../products/product/product-review/services/review.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(PaymentService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

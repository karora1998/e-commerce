import {async, TestBed} from '@angular/core/testing';

import { OrderPaymentService } from './order-payment.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('OrderPaymentService', () => {
  let service: OrderPaymentService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(OrderPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

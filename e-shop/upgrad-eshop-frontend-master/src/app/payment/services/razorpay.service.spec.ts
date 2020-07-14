import { TestBed } from '@angular/core/testing';

import { RazorpayService } from './razorpay.service';

describe('RazorpayService', () => {
  let service: RazorpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpayService);
  });

  it('covertAsPaise should convert as paise', () => {
    expect(service.covertAsPaise(1200)).toBe(120000)
    expect(service.covertAsPaise(1200.76)).toBe(120076)
  });
});

import { TestBed } from '@angular/core/testing';

import { DealService } from './deal.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DealService', () => {
  let service: DealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

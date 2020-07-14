import {async, TestBed} from '@angular/core/testing';

import { ManageDealService } from './manage-deal.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('ManageDealService', () => {
  let service: ManageDealService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(ManageDealService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

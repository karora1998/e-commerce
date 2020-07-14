import {async, TestBed} from '@angular/core/testing';

import { ReviewService } from './review.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(ReviewService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

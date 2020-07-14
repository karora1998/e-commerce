import {async, TestBed} from '@angular/core/testing';

import { ManageProductService } from './manage-product.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('ManageProductService', () => {
  let service: ManageProductService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(ManageProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

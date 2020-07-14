import {async, TestBed} from '@angular/core/testing';

import { AddressService } from './address.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('AddressService', () => {
  let service: AddressService;
  let httpMock: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));


  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.get(AddressService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

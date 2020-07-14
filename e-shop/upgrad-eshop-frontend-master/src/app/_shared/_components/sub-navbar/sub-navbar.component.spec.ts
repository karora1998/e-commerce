import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {SubNavbarComponent} from './sub-navbar.component';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {MatMenuModule} from '@angular/material/menu';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {mockCategories} from '../../../_mocks/product.mocks';
import {AppDataService} from '../../_services/app-data.service';
import {ProductService} from '../../../products/services/product.service';

describe('SubNavbarComponent', () => {
  let component: SubNavbarComponent;
  let fixture: ComponentFixture<SubNavbarComponent>;
  let httpMock: any;
  let nativeElement: HTMLElement;
  let productService: ProductService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatMenuModule],
      declarations: [SubNavbarComponent],
      providers: [AppDataService, ProductService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavbarComponent);
    httpMock = TestBed.get(HttpTestingController);
    productService = TestBed.get(ProductService);

    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeElement = fixture.debugElement.nativeElement;

  });


  it('should create new ', fakeAsync(() => {

    const appDataService = TestBed.get(AppDataService);

    appDataService.loadCategories();

    const url = environment.baseUrl + '/products/categories';
    httpMock.expectOne(url).flush(mockCategories);


    flushMicrotasks();
    fixture.detectChanges();


    const results: NodeListOf<any> = nativeElement.querySelectorAll('.category-link');
    expect(results.length).toBeGreaterThan(2);

    httpMock.verify();
  }));
});

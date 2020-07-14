import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentComponent } from './make-payment.component';

import {getActivatedRouteStubFor, getNotificationService} from '../../_mocks/utils.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../products/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../_shared/_services/notification.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MakePaymentComponent', () => {
  let component: MakePaymentComponent;
  let fixture: ComponentFixture<MakePaymentComponent>;


  let nativeElement: HTMLElement;
  let httpMock: any;
  const productId = 1;
  const activatedRouteStub = getActivatedRouteStubFor({id: productId});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, MatSnackBarModule, MatMenuModule, RouterTestingModule.withRoutes([])],
      declarations: [MakePaymentComponent],
      providers: [
        ProductService,
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {


    fixture = TestBed.createComponent(MakePaymentComponent);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;

  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

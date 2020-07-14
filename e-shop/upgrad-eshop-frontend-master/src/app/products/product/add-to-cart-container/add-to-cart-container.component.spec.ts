import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartContainerComponent } from './add-to-cart-container.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {getAsNumberInSelector, getNotificationService} from '../../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {getMockProductWithAvailableItemsSetAt} from '../../../_mocks/product.mocks';

describe('AddToCartContainerComponent', () => {
  let component: AddToCartContainerComponent;
  let fixture: ComponentFixture<AddToCartContainerComponent>;

  let nativeElement: HTMLElement;
  let notificationServiceSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, MatMenuModule, RouterTestingModule.withRoutes([])],
      declarations: [AddToCartContainerComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeElement = fixture.debugElement.nativeElement;
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();
  });



  function expectQuantityDisplayedEqualsTo(expected: number) {
    fixture.detectChanges();
    const updatedQuantity = getAsNumberInSelector(nativeElement, '.number-of-items');
    expect(updatedQuantity).toEqual(expected);
  }

});


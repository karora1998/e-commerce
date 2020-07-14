import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getNotificationService} from '../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BaseTestComponent} from '../../_mocks/testsetup.mocks';

import {orderRoutes} from '../order-routing.module';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  const testComponent = new BaseTestComponent<CreateOrderComponent>();

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(orderRoutes)],
      declarations: [CreateOrderComponent],
      providers: [
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    testComponent.setUpMocksForComponent(TestBed.createComponent(CreateOrderComponent));
    component = testComponent.component;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

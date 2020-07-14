import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getNotificationService} from '../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;

  let fixture: ComponentFixture<OrderDetailComponent>;

  let nativeElement: HTMLElement;
  let notificationServiceSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [OrderDetailComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeElement = fixture.debugElement.nativeElement;
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

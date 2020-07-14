import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderComponent } from './confirm-order.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getNotificationService} from '../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ConfirmOrderComponent', () => {
  let component: ConfirmOrderComponent;

  let fixture: ComponentFixture<ConfirmOrderComponent>;

  let nativeElement: HTMLElement;
  let notificationServiceSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [ConfirmOrderComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeElement = fixture.debugElement.nativeElement;
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

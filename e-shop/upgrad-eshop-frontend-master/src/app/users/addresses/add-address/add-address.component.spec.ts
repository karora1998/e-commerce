import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAddressComponent} from './add-address.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {getNotificationService} from '../../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AddAddressComponent', () => {
  let component: AddAddressComponent;

  let fixture: ComponentFixture<AddAddressComponent>;

  let nativeElement: HTMLElement;
  let notificationServiceSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [AddAddressComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nativeElement = fixture.debugElement.nativeElement;
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

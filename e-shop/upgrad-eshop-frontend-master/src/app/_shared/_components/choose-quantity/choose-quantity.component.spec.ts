import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChooseQuantityComponent} from './choose-quantity.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_services/notification.service';
import {getAsNumberInSelector, getNotificationService} from '../../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UiElementsModule} from '../../_modules/ui-elements.module';

describe('ChooseQuantityComponent', () => {
  let component: ChooseQuantityComponent;

  let fixture: ComponentFixture<ChooseQuantityComponent>;

  let nativeElement: HTMLElement;
  let notificationServiceSpy;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [ChooseQuantityComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseQuantityComponent);
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

  it('Increment Should increase Value', () => {



    component.availableItems = 2
    expect(component).toBeTruthy();

    expectQuantityDisplayedEqualsTo(1);

    component.increment();

    expect(component.count).toEqual(2);
    expectQuantityDisplayedEqualsTo(2);

    component.increment();
    expect(component.count).toEqual(2);
    expect(notificationServiceSpy).toHaveBeenCalled();


  });
  it('Decrement Should Decrease Value', () => {

    component.availableItems = 2
    expect(component).toBeTruthy();
    component.increment();

    expect(component.count).toEqual(2);
    expectQuantityDisplayedEqualsTo(2);

    component.decrement();

    expect(component.count).toEqual(1);
    expectQuantityDisplayedEqualsTo(1);


    component.decrement();

    expect(component.count).toEqual(0);
    expectQuantityDisplayedEqualsTo(0);

    component.decrement();

    expect(component.count).toEqual(0);
    expectQuantityDisplayedEqualsTo(0);


  });
});


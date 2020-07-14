import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import {EditProfileComponent} from '../../users/profile/edit-profile/edit-profile.component';
import {getActivatedRouteStubFor} from '../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;

  const activatedRouteStub = getActivatedRouteStubFor({});


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule,   FormsModule,
        ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [OrderHistoryComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

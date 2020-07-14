import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressComponent } from './edit-address.component';

import {Location} from '@angular/common';
import {getActivatedRouteStubFor} from '../../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('EditAddressComponent', () => {
  let component: EditAddressComponent;
  let fixture: ComponentFixture<EditAddressComponent>;
  let nativeElement: HTMLElement;
  let currentLocation: Location;
  const activatedRouteStub = getActivatedRouteStubFor({});


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule,   FormsModule,
        ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [EditAddressComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.inject(Location);
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

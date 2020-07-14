import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesComponent } from './addresses.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, UiElementsModule, HttpClientTestingModule
      ],
      declarations: [
        AddressesComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';


import {HttpClientTestingModule} from '@angular/common/http/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_services/notification.service';
import { getNotificationService} from '../../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UiElementsModule} from '../../_modules/ui-elements.module';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {getMatDialogRef} from '../../../_mocks/dialog.mocks';

describe('ConfirmDialogComponent With Value', () => {
  let component: ConfirmDialogComponent;

  let fixture: ComponentFixture<ConfirmDialogComponent>;

  let nativeElement: HTMLElement;
  const confirmMsg = 'Really ?';


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [ConfirmDialogComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()},
        {provide: MatDialogRef, useValue: getMatDialogRef()},
        {provide: MAT_DIALOG_DATA, useValue: {msg: confirmMsg}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
  });


  it('Should have the message passed to it', () => {
    expect(component).toBeTruthy();
    expect(component.msg).toBe(confirmMsg);
    component.onNoClick();

  });
  it('Should use default value if there is no message', () => {
    component.data.msg = '';
    component.ngOnInit();

    expect(component.msg).toBe('Do you want to continue');


  });

});

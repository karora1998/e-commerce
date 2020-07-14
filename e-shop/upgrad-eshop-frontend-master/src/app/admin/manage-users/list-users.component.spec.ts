import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {ListUsersComponent} from './list-users.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../_shared/_services/notification.service';
import {getNotificationService} from '../../_mocks/utils.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {getMockedAllUserResponse, getMockedValidAuthInfoForAdmin} from '../../_mocks/user.mocks';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import {getAsUser} from '../../auth/models/auth.models';
import {adminRoutes} from '../admin-routing.module';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;

  let fixture: ComponentFixture<ListUsersComponent>;

  let nativeElement: HTMLElement;

  let currentLocation: Location;
  let notificationService;
  let appDataService: AppDataService;

  let httpMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(adminRoutes)],
      declarations: [ListUsersComponent],
      providers: [

        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    notificationService = TestBed.get(NotificationService);
    currentLocation = TestBed.inject(Location);
    spyOn(notificationService, 'showErrorMessage').and.stub();
    spyOn(notificationService, 'showSuccessMessage').and.stub();
    fixture.detectChanges();
  });


  function loadMockDataFor(url: string, body) {
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body);
  }

  function throwMockErrorFor(url, code, text) {
    httpMock.expectOne(url).flush(null, {status: code, statusText: text});
  }

  function setSessionForLoggedInForAdmin() {
    appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForAdmin());


  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('by default should list all users', fakeAsync(() => {

    setSessionForLoggedInForAdmin();
    expect(component).toBeTruthy();
    tick();
    fixture.detectChanges();
    const url = environment.baseUrl + '/users';

    loadMockDataFor(url, getMockedAllUserResponse());
    flushMicrotasks();
    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.paginator).toBeTruthy();


  }));


  it('if the admin service is down , it should throw error', fakeAsync(() => {

    const url = environment.baseUrl + '/users';

    throwMockErrorFor(url, 500, 'Technical error');
    flushMicrotasks();
    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));

  function loadDefaultUsers() {
    setSessionForLoggedInForAdmin();
    expect(component).toBeTruthy();
    tick();
    fixture.detectChanges();
    const url = environment.baseUrl + '/users';

    loadMockDataFor(url, getMockedAllUserResponse());
    flushMicrotasks();
  }

  it('delete should call delete the user and show success message', fakeAsync(() => {

    loadDefaultUsers();
    const user = getMockedAllUserResponse()[0];

    component.delete(getAsUser(user));
    tick();
    const url = environment.baseUrl + '/users/deleteuser/' + user.userName;
    loadMockDataFor(url, 'Succesfully Deleted');
    flushMicrotasks();

    expect(notificationService.showSuccessMessage).toHaveBeenCalled();


  }));

  it('delete user on error should show error message', fakeAsync(() => {
    loadDefaultUsers();
    const user = getMockedAllUserResponse()[0];

    component.delete(getAsUser(user));
    tick();
    const url = environment.baseUrl + '/users/deleteuser/' + user.userName;

    throwMockErrorFor(url, 403, 'Unable to delete');
    flushMicrotasks();

    expect(notificationService.showErrorMessage).toHaveBeenCalled();


  }));

  it('clicking add admin button should redirect', fakeAsync(() => {
    loadDefaultUsers();

    component.addAdmin()
    tick();

    expect(currentLocation.path()).toBe('/admin/manage-users/add');
  }));
  it('clicking add manager button should redirect', fakeAsync(() => {
    loadDefaultUsers();

    component.addInventoryManager()
    tick();

    expect(currentLocation.path()).toBe('/admin/manage-users/add');
  }));


});

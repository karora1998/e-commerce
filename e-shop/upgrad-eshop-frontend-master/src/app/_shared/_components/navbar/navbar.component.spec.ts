import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UiElementsModule} from '../../_modules/ui-elements.module';

import {RouterTestingModule} from '@angular/router/testing';
import {getMockedValidAuthInfo} from '../../../_mocks/user.mocks';
import {authRoutes} from '../../../auth/auth-routing.module';
import {Location} from '@angular/common';
import {AppDataService} from '../../_services/app-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: AppDataService;
  let nativeElement: HTMLElement;
  let currentLocation: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(authRoutes)],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);

    //TODO Note: Angular 9 thing - No need to use provider and work with TestBed.GET rather will inject dynamically the service
    service = TestBed.inject(AppDataService);
    currentLocation = TestBed.inject(Location);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function signInWithMockAndTest() {
    service.onUserLoggedIn(getMockedValidAuthInfo());
    flushMicrotasks();
    fixture.detectChanges();
    expect(component.isLoggedIn).toBe(true);

    expect(component.user).not.toBe(null);
    expect(nativeElement.querySelector('.navbar-user-menu')).not.toBe(null);
    expect(nativeElement.querySelector('.navbar-sign-in-menu')).toBe(null);
  }

  it('if user authInfo is set the Menu should show denoting logged In User ', fakeAsync(() => {
    signInWithMockAndTest();


  }));

  it('if user authInfo is set and signout the Menu should show denote user to sign in ', fakeAsync(() => {


    signInWithMockAndTest();
    component.signOut();
    flushMicrotasks();
    fixture.detectChanges();

    expect(nativeElement.querySelector('.navbar-user-menu')).toBe(null);
    expect(nativeElement.querySelector('.navbar-sign-in-menu')).not.toBe(null);

    expect(currentLocation.path()).toBe('/auth/login');
  }));
});

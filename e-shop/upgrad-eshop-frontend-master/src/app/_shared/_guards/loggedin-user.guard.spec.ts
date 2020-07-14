import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoggedinUserGuard} from './loggedin-user.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Location} from '@angular/common';
import {getRouterStateSnapshotStubFor} from '../../_mocks/utils.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {authRoutes} from '../../auth/auth-routing.module';

describe('LoggedinUserGuard', () => {
  let guard: LoggedinUserGuard;
  let currentLocation: Location;
  const routerStateSnapshotStub = getRouterStateSnapshotStubFor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(authRoutes)]
    }).compileComponents();
  }));

  beforeEach(() => {

    guard = TestBed.inject(LoggedinUserGuard);
    currentLocation = TestBed.inject(Location);
  });

  it('canActivate should return true if logged in', () => {
    guard.isUserLoggedIn = true;
    expect(guard.canActivate(null, null)).toBe(true);
  });
  it('canActivate should redirect if false', fakeAsync(() => {
    guard.isUserLoggedIn = false;

    guard.canActivate(null, routerStateSnapshotStub);
    tick();
    expect(currentLocation.path()).toBe('/auth/login');
  }));
});

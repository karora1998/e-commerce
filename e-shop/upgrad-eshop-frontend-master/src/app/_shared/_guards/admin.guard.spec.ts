import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AdminGuard} from './admin.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {authRoutes} from '../../auth/auth-routing.module';
import {getRouterStateSnapshotStubFor} from '../../_mocks/utils.mock';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let currentLocation: Location;
  const routerStateSnapshotStub = getRouterStateSnapshotStubFor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(authRoutes)]
    }).compileComponents();
  }));

  beforeEach(() => {

    guard = TestBed.inject(AdminGuard);
    currentLocation = TestBed.inject(Location);
  });

  it('canActivate should return true if admin', () => {
    guard.isAdminUser = true;
    expect(guard.canActivate(null, null)).toBe(true);
  });
  it('canActivate should redirect if false', fakeAsync(() => {
    guard.isAdminUser = false;

    guard.canActivate(null, routerStateSnapshotStub);
    tick();
    expect(currentLocation.path()).toBe('/auth/login');
  }));
});

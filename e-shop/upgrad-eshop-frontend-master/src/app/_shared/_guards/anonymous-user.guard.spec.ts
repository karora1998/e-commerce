import {async, TestBed} from '@angular/core/testing';

import {AnonymousUserGuard} from './anonymous-user.guard';
import {Location} from '@angular/common';
import {getRouterStateSnapshotStubFor} from '../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authRoutes} from '../../auth/auth-routing.module';

describe('AnonymousUserGuard', () => {
  let guard: AnonymousUserGuard;
  let currentLocation: Location;
  const routerStateSnapshotStub = getRouterStateSnapshotStubFor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(authRoutes)]
    }).compileComponents();
  }));

  beforeEach(() => {

    guard = TestBed.inject(AnonymousUserGuard);
    currentLocation = TestBed.inject(Location);
  });
  it('canActivate should return based on AnonymousUser', () => {
    guard.isAnonymousUser = true;
    expect(guard.canActivate(null, null)).toBe(true);
    guard.isAnonymousUser = false;
    expect(guard.canActivate(null, null)).toBe(false);
  });

});

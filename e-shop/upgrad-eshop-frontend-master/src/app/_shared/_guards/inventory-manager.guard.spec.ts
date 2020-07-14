import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { InventoryManagerGuard } from './inventory-manager.guard';
import {Location} from '@angular/common';
import {getRouterStateSnapshotStubFor} from '../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {authRoutes} from '../../auth/auth-routing.module';


describe('InventoryManagerGuard', () => {
  let guard: InventoryManagerGuard;
  let currentLocation: Location;
  const routerStateSnapshotStub = getRouterStateSnapshotStubFor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(authRoutes)]
    }).compileComponents();
  }));

  beforeEach(() => {

    guard = TestBed.inject(InventoryManagerGuard);
    currentLocation = TestBed.inject(Location);
  });

  it('canActivate should return true if inventory manager', () => {
    guard.isInventoryManager = true;
    expect(guard.canActivate(null, null)).toBe(true);
  });
  it('canActivate should redirect if false', fakeAsync(() => {
    guard.isInventoryManager = false;

    guard.canActivate(null, routerStateSnapshotStub);
    tick();
    expect(currentLocation.path()).toBe('/auth/login');
  }));
});

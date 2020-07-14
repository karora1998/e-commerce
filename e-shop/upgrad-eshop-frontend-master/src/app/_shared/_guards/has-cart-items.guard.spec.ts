import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HasCartItemsGuard} from './has-cart-items.guard';
import {Location} from '@angular/common';
import {getRouterStateSnapshotStubFor} from '../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {productRoutes} from '../../products/products-routing.module';

describe('HasCartItemsGuard', () => {
  let guard: HasCartItemsGuard;
  let currentLocation: Location;
  const routerStateSnapshotStub = getRouterStateSnapshotStubFor();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(productRoutes)]
    }).compileComponents();
  }));

  beforeEach(() => {

    guard = TestBed.inject(HasCartItemsGuard);
    currentLocation = TestBed.inject(Location);
  });

  it('canActivate should return true if cartitem count greater than zero', () => {
    guard.cartItemCount=2
    expect(guard.canActivate(null, null)).toBe(true);
  });
  it('canActivate should redirect if false', fakeAsync(() => {
    guard.cartItemCount=0

    guard.canActivate(null, routerStateSnapshotStub);
    tick();
    expect(currentLocation.path()).toBe('/products');
  }));
});

import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {CartIconComponent} from './cart-icon.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../_modules/ui-elements.module';
import {NotificationService} from '../../_services/notification.service';
import {getNotificationService} from '../../../_mocks/utils.mock';
import {orderRoutes} from '../../../order/order-routing.module';
import {Location} from '@angular/common';
import {AppDataService} from '../../_services/app-data.service';
import {getMockedValidAuthInfoForUser} from '../../../_mocks/user.mocks';
import {getMockedCartWithData, getMockedCartWithEmptyData} from '../../../_mocks/cart.mocks';


describe('CartIconComponent', () => {
  let component: CartIconComponent;
  let fixture: ComponentFixture<CartIconComponent>;
  let currentLocation: Location;
  let notificationServiceSpy;
  let appDataService: AppDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(orderRoutes)],
      declarations: [CartIconComponent],
      providers: [{provide: NotificationService, useValue: getNotificationService()}]

    })
      .compileComponents();
  }));

  function setSessionForLoggedInUser() {
    appDataService = TestBed.inject(AppDataService);
    appDataService.onUserLoggedIn(getMockedValidAuthInfoForUser());


  }

  beforeEach(() => {

    fixture = TestBed.createComponent(CartIconComponent);
    component = fixture.componentInstance;
    currentLocation = TestBed.inject(Location);
    setSessionForLoggedInUser();
    fixture.detectChanges();
    notificationServiceSpy = spyOn(TestBed.get(NotificationService), 'showErrorMessage').and.stub();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking button should redirect to orders if count is greater than zero', fakeAsync(() => {
    appDataService.onUpdateCart(getMockedCartWithData());
    tick();
    component.redirect();
    tick();

    expect(currentLocation.path()).toBe('/orders/create');

  }));

  it('clicking button should show error notification', fakeAsync(() => {
    appDataService.onUpdateCart(getMockedCartWithEmptyData());
    tick();
    fixture.detectChanges();
    component.redirect();
    expect(notificationServiceSpy).toHaveBeenCalled();
  }));
});

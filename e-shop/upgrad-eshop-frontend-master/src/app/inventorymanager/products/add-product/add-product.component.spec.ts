import {async, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {AddProductComponent} from './add-product.component';
import {getNotificationService} from '../../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BaseTestComponent} from '../../../_mocks/testsetup.mocks';

import {inventoryManagerRoutes} from '../../inventory-manager-routing.module';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {
  getMockedNewDealResponsewithAmount,
  getMockedNewProductResponseWithDeal,
  getMockedNewProductWithDeal
} from '../../../_mocks/product.mocks';
import {environment} from '../../../../environments/environment';

describe('AddProductComponent', () => {
  const testComponent = new BaseTestComponent<AddProductComponent>();
  let component: AddProductComponent;
  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(inventoryManagerRoutes)],
      declarations: [AddProductComponent],
      providers: [
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    testComponent.setUpMocksForComponent(TestBed.createComponent(AddProductComponent));
    component = testComponent.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('adding new Product with deal should call server and display appropriate success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 55;
    component.initForm(getMockedNewProductWithDeal(dealPrice));

    component.onProductFormSubmit();
    let url = environment.baseUrl + '/products';
    testComponent.loadMockDataFor(url, getMockedNewProductResponseWithDeal(dealPrice));
    flushMicrotasks();
    url = environment.baseUrl + '/deals';
    testComponent.loadMockDataFor(url, getMockedNewDealResponsewithAmount(dealPrice));

    testComponent.expectSuccessNotificationShownWithMessage('Successfully Added Product With Deal');


  }));
  it('adding new Product with deal and if deal service throws error , error notification should be shown', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 55;
    component.initForm(getMockedNewProductWithDeal(dealPrice));

    component.onProductFormSubmit();
    let url = environment.baseUrl + '/products';
    testComponent.loadMockDataFor(url, getMockedNewProductResponseWithDeal(dealPrice));
    flushMicrotasks();
    url = environment.baseUrl + '/deals';
    testComponent.throwTechnicalErrorFor(url)

    testComponent.expectErrorNotificationShown();


  }));
  it('adding new Product without deal should call server and display appropriate success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 0;
    component.initForm(getMockedNewProductWithDeal(dealPrice));

    component.onProductFormSubmit();
    const url = environment.baseUrl + '/products';
    testComponent.loadMockDataFor(url, getMockedNewProductResponseWithDeal(dealPrice));
    flushMicrotasks();


    testComponent.expectSuccessNotificationShownWithMessage('Successfully Added Product');


  }));

  it('adding new Product without deal if server throws error expect error message to be shown', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 0;
    component.initForm(getMockedNewProductWithDeal(dealPrice));

    component.onProductFormSubmit();
    const url = environment.baseUrl + '/products';
    testComponent.throwTechnicalErrorFor(url);
    flushMicrotasks();


    testComponent.expectErrorNotificationShown();


  }));
});

import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';

import {EditProductComponent} from './edit-product.component';
import {getActivatedRouteStubFor, getNotificationService} from '../../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseTestComponent} from '../../../_mocks/testsetup.mocks';
import {inventoryManagerRoutes} from '../../inventory-manager-routing.module';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {
  getAMockProduct,
  getMockedNewDealResponsewithAmount,
  getMockedNewProductResponseWithDeal,
  getMockedNewProductWithDeal
} from '../../../_mocks/product.mocks';
import {environment} from '../../../../environments/environment';

describe('EditProductComponent', () => {

  const testComponent = new BaseTestComponent<EditProductComponent>();
  let component: EditProductComponent;
  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(inventoryManagerRoutes)],
      declarations: [EditProductComponent],
      providers: [
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    testComponent.setUpMocksForComponent(TestBed.createComponent(EditProductComponent));
    component = testComponent.component;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  function getProduct(dealPrice: number) {
    const mockedNewProductWithDeal = getAMockProduct();
    mockedNewProductWithDeal.dealPrice = dealPrice;
    return mockedNewProductWithDeal;
  }

  function getProductResponse(dealPrice: number) {
    const mockedNewProductWithDeal = getMockedNewProductResponseWithDeal(dealPrice);
    mockedNewProductWithDeal.productId = getAMockProduct().productId;
    return mockedNewProductWithDeal;
  }

  it('updating Product with deal should call server and display appropriate success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 55;
    const mockedNewProductWithDeal = getProduct(dealPrice);
    component.onParameterLoaded({product: mockedNewProductWithDeal});

    component.onProductFormSubmit();
    let url = environment.baseUrl + '/products/' + mockedNewProductWithDeal.productId;
    testComponent.loadMockDataFor(url, getProductResponse(dealPrice));
    flushMicrotasks();
    url = environment.baseUrl + '/deals';
    testComponent.loadMockDataFor(url, getMockedNewDealResponsewithAmount(dealPrice));

    testComponent.expectSuccessNotificationShownWithMessage('Successfully Updated Product With Deal');


  }));
  it('updating  Product with deal and if deal service throws error , error notification should be shown', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 55;
    const mockedNewProductWithDeal = getProduct(dealPrice);
    component.onParameterLoaded({product: mockedNewProductWithDeal});

    component.onProductFormSubmit();
    let url = environment.baseUrl + '/products/' + mockedNewProductWithDeal.productId;
    testComponent.loadMockDataFor(url, getProductResponse(dealPrice));
    flushMicrotasks();
    url = environment.baseUrl + '/deals';
    testComponent.throwTechnicalErrorFor(url)

    testComponent.expectErrorNotificationShown();


  }));


  it('updating Product without deal should call server and display appropriate success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 0;
    const mockedNewProductWithDeal = getProduct(dealPrice);
    component.onParameterLoaded({product: mockedNewProductWithDeal});

    component.onProductFormSubmit();
    const url = environment.baseUrl + '/products/' + mockedNewProductWithDeal.productId;
    testComponent.loadMockDataFor(url, getProductResponse(dealPrice));
    flushMicrotasks();

    testComponent.expectSuccessNotificationShownWithMessage('Successfully Updated Product');


  }));


  it('updating Product without deal if server throws error expect error message to be shown', fakeAsync(() => {


    testComponent.setSessionForLoggedInForManager();
    const dealPrice = 0;
    const mockedNewProductWithDeal = getProduct(dealPrice);
    component.onParameterLoaded({product: mockedNewProductWithDeal});

    component.onProductFormSubmit();
    const url = environment.baseUrl + '/products/' + mockedNewProductWithDeal.productId;
    testComponent.throwTechnicalErrorFor(url)
    flushMicrotasks();
    testComponent.expectErrorNotificationShown();






  }));

});

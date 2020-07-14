import {async, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import {ListProductsComponent} from './list-products.component';
import {getNotificationService} from '../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {adminRoutes} from '../../admin/admin-routing.module';
import {NotificationService} from '../../_shared/_services/notification.service';
import {BaseTestComponent} from '../../_mocks/testsetup.mocks';
import {environment} from '../../../environments/environment';
import {asQueryString} from '../../_shared/_helpers/string.utils';
import {getMockProductsResponse} from '../../_mocks/product.mocks';
import {inventoryManagerRoutes} from '../inventory-manager-routing.module';


describe('ListProductsComponent', () => {
  const testComponent = new BaseTestComponent<ListProductsComponent>();
  let component: ListProductsComponent;
  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes(inventoryManagerRoutes)],
      declarations: [ListProductsComponent],
      providers: [
        {provide: NotificationService, useValue: getNotificationService()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    testComponent.setUpMocksForComponent(TestBed.createComponent(ListProductsComponent));
    component = testComponent.component;
  });


  it('should create', () => {
    expect(testComponent.component).toBeTruthy();
  });

  function loadProducts() {
    const url = environment.baseUrl + '/products' + asQueryString(component.productSearchRequest);
    testComponent.loadMockDataFor(url, getMockProductsResponse());
    flushMicrotasks();
  }

  it('by default should list all products', fakeAsync(() => {
    loadProducts();
    expect(component.products.length).toBeGreaterThan(0);


  }));
  it('When fetching products from server, if server throws error , error notification should be shown', fakeAsync(() => {

    const url = environment.baseUrl + '/products' + asQueryString(component.productSearchRequest);
    testComponent.throwTechnicalErrorFor(url);
    flushMicrotasks();
    testComponent.expectErrorNotificationShown();
  }));
  it('onPageChange should change pageNo, pageSize variable', fakeAsync(() => {

    loadProducts();
    const currentPageSize = component.productSearchRequest.pageSize;
    const pageNo = component.productSearchRequest.pageNo;


    component.onPageChange({pageSize: 12, pageIndex: 3, length: 25});


    expect(pageNo).not.toBe(component.productSearchRequest.pageNo);
  }));
  it('reload based on sort should change sort variable', fakeAsync(() => {

    loadProducts();
    const direction = 'DESC';
    const sortBy = 'name';
    component.reloadBasedOnSort({direction, sortBy});


    expect(sortBy).toBe(component.productSearchRequest.sortBy);
    expect(direction).toBe(component.productSearchRequest.direction);
  }));

  it('reload based on rating should change overAllRating variable', fakeAsync(() => {

    loadProducts();
    const direction = 'DESC';
    const rating = 4;
    component.reloadBasedOnRating(rating);


    expect(rating).toBe(component.productSearchRequest.overAllRating);
    expect(direction).toBe(component.productSearchRequest.direction);
  }));

  it('clicking add button should redirect to add product page', fakeAsync(() => {

    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    component.add();

    testComponent.expectLocationToBe('/manager/products/add');

  }));
  it('clicking edit button should redirect to edit product page', fakeAsync(() => {

    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    const product = component.products[0];

    component.onEdit(product);

    testComponent.expectLocationToBe('/manager/products/edit');

  }));

  it('delete should call delete the product and show success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    const product = component.products[0];
    component.deleteProduct(product);
    tick();

    const url = environment.baseUrl + '/products/' + product.productId;

    testComponent.loadMockDataFor(url, 'Succesfully Deleted');
    flushMicrotasks();

    testComponent.expectSuccessNotificationShown();


  }));
  it('delete should show error message,if it has server error', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    const product = component.products[0];
    component.onDelete(product);
    tick();

    const url = environment.baseUrl + '/products/' + product.productId;

    testComponent.throwTechnicalErrorFor(url);
    flushMicrotasks();

    testComponent.expectErrorNotificationShown();


  }));
  it('delete deal should call delete the deal and show success message', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    const product = component.products[0];
    component.onRemoveDeal(product);
    tick();

    const url = environment.baseUrl + '/deals/' + product.productId;


    testComponent.loadMockDataFor(url, 'Successfully Deleted');
    flushMicrotasks();

    testComponent.expectSuccessNotificationShown();


  }));

  it('delete deal should show error message,if it has server error', fakeAsync(() => {
    testComponent.setSessionForLoggedInForManager();
    loadProducts();

    const product = component.products[0];
    component.onRemoveDeal(product);
    tick();

    const url = environment.baseUrl + '/deals/' + product.productId;



    testComponent.throwTechnicalErrorFor(url)
    flushMicrotasks();

    testComponent.expectErrorNotificationShown();


  }));


});

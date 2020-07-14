import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EditProductContainerComponent} from './edit-product-container.component';
import {getActivatedRouteStubFor} from '../../../_mocks/utils.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UiElementsModule} from '../../../_shared/_modules/ui-elements.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {EventEmitter, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {getMockedProductService, getMockProductWithDeal} from '../../../_mocks/product.mocks';

describe('EditProductContainerComponent', () => {
  let component: EditProductContainerComponent;
  let fixture: ComponentFixture<EditProductContainerComponent>;
  const activatedRouteStub = getActivatedRouteStubFor({});


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [EditProductContainerComponent],
      providers: [

        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductContainerComponent);
    component = fixture.componentInstance;
    spyOn(component.onRemoveDeal, 'emit').and.stub();
    spyOn(component.onDelete, 'emit').and.stub();
    spyOn(component.onEdit, 'emit').and.stub();

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('should emit messages', fakeAsync(() => {
    const product = getMockProductWithDeal();
    component.edit(product);
    tick();
    expect(component.onEdit.emit).toHaveBeenCalled();
    component.delete(product);
    tick();
    expect(component.onDelete.emit).toHaveBeenCalled();
    component.removeDeal(product);
    tick();
    expect(component.onRemoveDeal.emit).toHaveBeenCalled();

  }));
});

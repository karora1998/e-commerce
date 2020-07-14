import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductItemThumbnailComponent} from './product-item-thumbnail.component';
import {MatMenuModule} from '@angular/material/menu';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {getMockProductWithDeal, getMockProductWithNoDeal} from '../../_mocks/product.mocks';
import {RatingDisplayComponent} from '../../_shared/_components/rating-display/rating-display.component';
import {TruncateTextPipe} from '../../_shared/_pipes/truncate-text.pipe';

describe('ProductItemThumbnailComponent', () => {
  let component: ProductItemThumbnailComponent;
  let fixture: ComponentFixture<ProductItemThumbnailComponent>;

  let nativeElement: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ProductItemThumbnailComponent, RatingDisplayComponent, TruncateTextPipe],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {

    fixture = TestBed.createComponent(ProductItemThumbnailComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;

    //SHould not use fixture.detectChanges ,it because its binded with Input
    //fixture.detectChanges();
  }));

  it('should display Both prices, If there is a Deal', () => {
    component.product = getMockProductWithDeal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const oldPriceElement = nativeElement.querySelector('.old-price');
    const newPriceElement = nativeElement.querySelector('.new-price');
    expect(newPriceElement).not.toBeNull();
    expect(oldPriceElement).not.toBeNull();


  });

  it('should display Only the latest price, If there is no Deal', () => {
    component.product = getMockProductWithNoDeal();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const oldPriceElement = nativeElement.querySelector('.old-price');
    const newPriceElement = nativeElement.querySelector('.new-price');


    expect(newPriceElement).not.toBeNull();
    expect(oldPriceElement).toBeNull();


  });
});

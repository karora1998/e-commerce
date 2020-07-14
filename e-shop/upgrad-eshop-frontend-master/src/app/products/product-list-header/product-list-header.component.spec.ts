import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListHeaderComponent} from './product-list-header.component';
import {MatMenuModule} from '@angular/material/menu';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ProductListHeaderComponent', () => {
  let component: ProductListHeaderComponent;
  let fixture: ComponentFixture<ProductListHeaderComponent>;

  let nativeElement: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ProductListHeaderComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {

    fixture = TestBed.createComponent(ProductListHeaderComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    spyOn(component.onSortChange, 'emit');
    spyOn(component.onRatingChange, 'emit');

  }));

  function expectRatingToBe(expectedLabel) {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const label = nativeElement.querySelector('.lbl-selected-rating').textContent;
    expect(label.trim()).toBe(expectedLabel);

  }
  function expectSortingToBe(expectedLabel) {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const label = nativeElement.querySelector('.lbl-selected-sort').textContent;
    expect(label.trim()).toBe(expectedLabel);

  }

  it('Rating Default , Onchange Tests ', () => {


    expectRatingToBe('All');

    component.ratingTypes.forEach(ratingType => {
      component.changeRating(ratingType);
      expect(component.onRatingChange.emit).toHaveBeenCalled();
      expectRatingToBe(ratingType.label);
    });


  });
  it('Sorting Default , Onchange Tests ', () => {


    expectSortingToBe('Default');

    component.sortTypes.forEach(sortType => {
      component.changeSorting(sortType);
      expect(component.onSortChange.emit).toHaveBeenCalled();
      expectSortingToBe(sortType.label);
    });


  });

});

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SearchbarComponent} from './searchbar.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {productRoutes} from '../../../products/products-routing.module';
import {Location} from '@angular/common';


describe('SearchbarComponent', () => {
  let searchbarComponent: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let currentLocation: Location;
  let nativeElement: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatMenuModule, RouterTestingModule.withRoutes(productRoutes)],
      declarations: [SearchbarComponent],
      providers: [
        Location
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));


  beforeEach((() => {


    fixture = TestBed.createComponent(SearchbarComponent);
    searchbarComponent = fixture.componentInstance;
    currentLocation = TestBed.get(Location);
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;


  }));


  it('searching without category should redirect with empty category and search string', fakeAsync(() => {

    expect(searchbarComponent).toBeTruthy();
    const searchString = 'Halo';
    searchbarComponent.searchString = searchString;
    fixture.detectChanges();
    const element = nativeElement.querySelector('.search-box');

    console.log(element);
    fixture.detectChanges();
    const searchInUi = element.getAttribute('value');

    searchbarComponent.search();

    tick();
    fixture.detectChanges();
    expect(currentLocation.path()).toBe('/products/search//' + searchString);

  }));


  it('searching with category should redirect with  category and search string', fakeAsync(() => {

    expect(searchbarComponent).toBeTruthy();
    const searchString = 'Halo';
    searchbarComponent.searchString = searchString;
    const category = 'test';
    searchbarComponent.changeSelectedCategory(category);
    fixture.detectChanges();
    const element = nativeElement.querySelector('.search-box');

    fixture.detectChanges();
    const searchInUi = element.getAttribute('value');

    searchbarComponent.search();
    tick();
    fixture.detectChanges();
    expect(currentLocation.path()).toBe('/products/search/' + category + '/' + searchString);

  }));


  it('searching with empty category and search string', fakeAsync(() => {

    expect(searchbarComponent).toBeTruthy();


    let oldPath = currentLocation.path();
    searchbarComponent.search();
    tick();
    fixture.detectChanges();
    expect(currentLocation.path()).toBe(oldPath);

  }));

  it('resetCategory should reset search string ', fakeAsync(() => {


    const category = 'test';
    searchbarComponent.changeSelectedCategory(category);

    expect(searchbarComponent.selectedCategory).toBe(category);

    searchbarComponent.resetCategory();

    expect(searchbarComponent.selectedCategory).toBe(searchbarComponent.DEFAULT_CATEGORY);

  }));


});

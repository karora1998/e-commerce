import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RatingInputContainerComponent} from './rating-input-container.component';

describe('RatingInputContainerComponent', () => {
  let component: RatingInputContainerComponent;
  let fixture: ComponentFixture<RatingInputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingInputContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingInputContainerComponent);
    component = fixture.componentInstance;
    spyOn(component.onValueChange, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create stars based on number', () => {
    component.updateButtons(4);


    expect(component.onValueChange.emit).toHaveBeenCalledWith(4);
  });
});

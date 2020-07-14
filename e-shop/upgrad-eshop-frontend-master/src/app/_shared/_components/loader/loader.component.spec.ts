import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderComponent} from './loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AppDataService} from '../../_services/app-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let appDataService: AppDataService;

  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      imports: [HttpClientTestingModule, MatProgressBarModule],
      providers: [AppDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    appDataService = TestBed.get(AppDataService);
    nativeElement = fixture.debugElement.nativeElement;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    let element = nativeElement.querySelector('mat-progress-bar');
    expect(element).toBeNull();

    appDataService.showLoading();
    fixture.detectChanges();

    element = nativeElement.querySelector('mat-progress-bar');
    expect(element).not.toBeNull();

    appDataService.hideLoading();
    fixture.detectChanges();

    element = nativeElement.querySelector('mat-progress-bar');
    expect(element).toBeNull();
  });
});

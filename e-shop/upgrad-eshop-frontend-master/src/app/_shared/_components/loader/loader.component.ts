import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppDataService} from '../../_services/app-data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  showLoading = false;
  progressSubscription$;

  constructor(private appDataService: AppDataService) {
  }

  ngOnInit(): void {
    console.log(this.appDataService);
    this.progressSubscription$ = this.appDataService.showProgressBar$.subscribe(value => {

      this.showLoading = value;
    });
  }

  ngOnDestroy(): void {
    this.progressSubscription$.unsubscribe();
  }
}

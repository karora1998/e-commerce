import {Component, OnInit} from '@angular/core';
import {AppDataService} from './_shared/_services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'upgrad-eshop-frontend';

  constructor(private appDataService: AppDataService) {


  }

  ngOnInit(): void {
    this.appDataService.initializeApp();
  }

  closeSubMenus() {

  }
}

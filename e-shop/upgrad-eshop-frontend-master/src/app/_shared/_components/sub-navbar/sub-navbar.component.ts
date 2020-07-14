import {Component, OnInit} from '@angular/core';
import {AppDataService} from '../../_services/app-data.service';
import {Observable} from 'rxjs';
import {isAdmin, isInventoryManager} from '../../_helpers/auth.utils';

@Component({
  selector: 'app-sub-navbar',
  templateUrl: './sub-navbar.component.html',
  styleUrls: ['./sub-navbar.component.scss']
})
export class SubNavbarComponent implements OnInit {

  categories$: Observable<string[]>;
  canShowManagerOperations = false;
  canShowAdminOperations = false;


  constructor(private appDataService: AppDataService) {

    appDataService.authInfo$.subscribe(authInfo => {

      this.canShowManagerOperations = isInventoryManager(authInfo);
      this.canShowAdminOperations = isAdmin(authInfo);


    });

  }

  ngOnInit(): void {

    this.categories$ = this.appDataService.categories$;
  }

}

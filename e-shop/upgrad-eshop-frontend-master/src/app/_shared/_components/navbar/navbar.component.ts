import {Component, OnInit} from '@angular/core';

import {AuthInfo, User} from '../../../auth/models/auth.models';
import {Router} from '@angular/router';
import {getUser,isLoggedIn} from '../../_helpers/auth.utils';
import {AppDataService} from '../../_services/app-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isLoggedIn = false;
  user: User;

  constructor(private  appDataService: AppDataService, public router: Router) {

  }


  ngOnInit(): void {
    this.appDataService.authInfo$.subscribe((authInfo: AuthInfo) => {

      this.isLoggedIn = isLoggedIn(authInfo);
      this.user = getUser(authInfo);
    });
  }

  signOut(){

    this.appDataService.signOut();
    this.router.navigate(['/auth/login']);
  }

}

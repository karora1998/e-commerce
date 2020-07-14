import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {getUser} from '../../_shared/_helpers/auth.utils';
import {User} from '../../auth/models/auth.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  user: User;

  constructor(public formBuilder: FormBuilder, public router: Router, private userService: UserService, private notificationService: NotificationService, private appDataService: AppDataService) {


  }

  ngOnInit() {

    this.appDataService.authInfo$.subscribe(authInfo => {
      this.user = getUser(authInfo);
    });


  }

}

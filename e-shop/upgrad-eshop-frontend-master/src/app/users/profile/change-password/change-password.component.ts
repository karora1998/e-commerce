import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {emailValidator, matchingPasswordValidator} from '../../../_shared/_helpers/validators';

import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {UserService} from '../../services/user.service';
import {User} from '../../../auth/models/auth.models';
import {ChangePasswordRequest, UpdateUserDetailRequest} from '../../models/user.models';
import {getUser} from '../../../_shared/_helpers/auth.utils';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public router: Router, private userService: UserService, private notificationService: NotificationService, private appDataService: AppDataService) {


  }

  ngOnInit() {


    this.changePasswordForm = this.formBuilder.group({

      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswordValidator('password', 'confirmPassword')});


  }


  private onChangePasswordComplete(message) {

    this.notificationService.showSuccessMessage(message);
    this.router.navigate(['/user/profile']);


  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  public changePassword(): void {
    if (this.changePasswordForm.valid) {
      const changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest({
        'oldPassword': this.changePasswordForm.controls.oldPassword.value,
        'password': this.changePasswordForm.controls.password.value
      });



      this.userService.changePassword(changePasswordRequest)
        .subscribe(
          (response) => {                           //Next callback
            this.onChangePasswordComplete(response);
          },
          (error) => {                              //Error callback
            console.error('error caught in component',error);
            this.onError(error);
          }
        );

    }
  }

}

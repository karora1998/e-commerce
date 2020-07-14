import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {emailValidator, matchingPasswordValidator} from '../../../_shared/_helpers/validators';

import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {UserService} from '../../services/user.service';
import {AuthInfo, User} from '../../../auth/models/auth.models';
import {UpdateUserDetailRequest} from '../../models/user.models';
import {getAuthToken, getUser} from '../../../_shared/_helpers/auth.utils';
import {getToken} from 'codelyzer/angular/styles/cssLexer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  updateProfileForm: FormGroup;

  token: String;

  constructor(public formBuilder: FormBuilder, public router: Router, private userService: UserService, private notificationService: NotificationService, private appDataService: AppDataService) {


  }

  ngOnInit() {

    this.updateDetailsInForm(this.createEmptyUserObject());
    this.appDataService.authInfo$.subscribe(authInfo => {
      this.token = getAuthToken(authInfo);
      this.updateDetailsInForm(getUser(authInfo));


    });


  }

  createEmptyUserObject() {
    return new User({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',

    });
  }

  private updateDetailsInForm(user) {

    //  const user = this.user;

    if (!user) {
      console.log('Invalid user details');
      return;
    }
    this.updateProfileForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [user.lastName, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [user.email, Validators.compose([Validators.required, emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required,  Validators.minLength(8), Validators.maxLength(15)])]
    });
  }


  private onUpdateProfileComplete(user: User) {


    this.appDataService.onUpdateProfileDetails(user,this.token);
    this.notificationService.showSuccessMessage('Successfully Updated Profile Details');

    this.router.navigate(['/user/profile']);
  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  public updateProfile(): void {
    if (this.updateProfileForm.valid) {
      const updateUserDetailRequest: UpdateUserDetailRequest = new UpdateUserDetailRequest({
        email: this.updateProfileForm.controls.email.value,
        firstName: this.updateProfileForm.controls.firstName.value,
        lastName: this.updateProfileForm.controls.lastName.value,
        phoneNumber: this.updateProfileForm.controls.phoneNumber.value,
      });


      this.userService.updateUserDetails(updateUserDetailRequest).subscribe
      ((user: User) => this.onUpdateProfileComplete(user),
        (error => this.onError(error)));


    }
  }

}

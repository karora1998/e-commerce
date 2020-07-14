import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {emailValidator, matchingPasswordValidator} from '../../../_shared/_helpers/validators';
import {AuthInfo, RegisterRequest} from '../../models/auth.models';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, private authService: AuthService, private notificationService: NotificationService, private appDataService: AppDataService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required,  Validators.minLength(8), Validators.maxLength(15)])],
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswordValidator('password', 'confirmPassword')});

  }

  private onRegisterComplete(authInfo: AuthInfo) {


    this.appDataService.onUserLoggedIn(authInfo);


  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  public register(): void {
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = new RegisterRequest({
        email: this.registerForm.controls.email.value,
        firstName: this.registerForm.controls.firstName.value,
        lastName: this.registerForm.controls.lastName.value,
        phoneNumber: this.registerForm.controls.phoneNumber.value,
        password: this.registerForm.controls.password.value,
        userName: this.registerForm.controls.userName.value
      });


      this.authService.register(registerRequest).subscribe
      ((authInfo: AuthInfo) => this.onRegisterComplete(authInfo),
        (error => this.onError(error)));


    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AuthInfo, LoginRequest} from '../../models/auth.models';

import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  loginForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public router: Router, private authService: AuthService, private notificationService: NotificationService, private userAuthService: AppDataService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'userName': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });


  }

  public onLogin(authInfo: AuthInfo) {

    this.userAuthService.onUserLoggedIn(authInfo);


  }

  public onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  public login(): void {
    if (this.loginForm.valid) {


      const loginRequest: LoginRequest = new LoginRequest({
        password: this.loginForm.controls['password'].value,
        userName: this.loginForm.controls['userName'].value
      });

      this.authService.login(loginRequest).subscribe
      ((response: AuthInfo) => {
          this.onLogin(response);
        },
        (error => {
          this.onError(error);
        }));

    }
  }


}




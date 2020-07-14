import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {AppDataService} from '../../../_shared/_services/app-data.service';
import {RegisterRequest, User} from '../../../auth/models/auth.models';
import {AdminService} from '../../services/admin.service';
import {onStateVariablesReceive} from '../../../_shared/_helpers/router.utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator, matchingPasswordValidator} from '../../../_shared/_helpers/validators';

@Component({
  selector: 'app-add-user-with-type',
  templateUrl: './add-user-with-type.component.html',
  styleUrls: ['./add-user-with-type.component.scss']
})
export class AddUserWithTypeComponent implements OnInit {

  title = 'Register';
  url = '';
  isLoaded = false;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, private adminService: AdminService, public activatedRoute: ActivatedRoute, private notificationService: NotificationService, private appDataService: AppDataService) {
  }


  ngOnInit(): void {

    onStateVariablesReceive(this.activatedRoute).subscribe((res) => {
      this.onParameterLoaded(res);
    });

  }


  initApp() {


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])],
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswordValidator('password', 'confirmPassword')});


  }

   onParameterLoaded(parameters: any) {


    if (parameters && parameters.title && parameters.url) {
      this.title = parameters.title;
      this.url = parameters.url;
      this.initApp();
      this.isLoaded = true;
    }
  }


  goBackToUserList() {

    this.router.navigate(['/admin/manage-users']);

  }

  private onRegisterComplete(user: User) {

    this.notificationService.showSuccessMessage('Successfully registered for user ' + user.userName);
    this.goBackToUserList();

  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }

  public register(): void {


    const registerRequest: RegisterRequest = new RegisterRequest({
      email: this.registerForm.controls.email.value,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      phoneNumber: this.registerForm.controls.phoneNumber.value,
      password: this.registerForm.controls.password.value,
      userName: this.registerForm.controls.userName.value
    });


    this.adminService.registerUserOn(this.url, registerRequest).subscribe
    ((user: User) => this.onRegisterComplete(user),
      (error => this.onError(error)));


  }

}

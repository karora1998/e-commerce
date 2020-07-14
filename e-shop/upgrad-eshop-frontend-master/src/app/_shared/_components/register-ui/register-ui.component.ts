import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {emailValidator, matchingPasswordValidator} from '../../_helpers/validators';
import {RegisterRequest} from '../../../auth/models/auth.models';

@Component({
  selector: 'app-register-ui',
  templateUrl: './register-ui.component.html',
  styleUrls: ['./register-ui.component.scss']
})
export class RegisterUiComponent implements OnInit {

  registerForm: FormGroup;

  @Output() onRegisterDataComplete: EventEmitter<RegisterRequest> = new EventEmitter();

  constructor(public formBuilder: FormBuilder) {
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

      this.onRegisterDataComplete.emit(registerRequest);



    }
  }

}

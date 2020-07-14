import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterUiComponent} from './register-ui.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UiElementsModule} from '../../_modules/ui-elements.module';
import {getAllErrors} from '../../../_mocks/utils.mock';
import {getRegisterRequestWith} from '../../../_mocks/user.mocks';

describe('RegisterUiComponent', () => {
  let component: RegisterUiComponent;
  let fixture: ComponentFixture<RegisterUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UiElementsModule, RouterTestingModule.withRoutes([])],
      declarations: [RegisterUiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUiComponent);
    component = fixture.componentInstance;
    spyOn(component.onRegisterDataComplete, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('email field validity', () => {
    let errors = {};
    let email = component.registerForm.controls.email;
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    email.setValue('invalid format');
    expect(email.hasError('invalidEmail')).toBeTruthy();
  });
  it('userName field validity', () => {
    let errors = {};
    const registerForm = component.registerForm;
    let username = registerForm.controls.userName;
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });



  it('Register should emit values', () => {
    const registerForm = component.registerForm;
    const formControls = registerForm.controls;
    expect(registerForm.valid).toBeFalsy();

    const registerRequest = getRegisterRequestWith("sampleuser", "password");


    formControls.email.setValue(registerRequest.email);
    formControls.firstName.setValue(registerRequest.firstName);
    formControls.lastName.setValue(registerRequest.lastName);
    formControls.phoneNumber.setValue(registerRequest.phoneNumber);
    formControls.password.setValue(registerRequest.password);
    formControls.confirmPassword.setValue(registerRequest.password);
    formControls.userName.setValue(registerRequest.userName);
    fixture.detectChanges();

    expect(registerForm.valid).toBeTruthy();

    component.register();
    expect(component.onRegisterDataComplete.emit).toHaveBeenCalled()

  });

});

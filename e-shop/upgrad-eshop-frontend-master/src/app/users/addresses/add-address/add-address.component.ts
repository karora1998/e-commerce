import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {Address, AddressRequest} from '../../models/user.models';
import {AddressService} from '../services/address.service';
import {createEmptyAddressObject, getAddressRequestFromForm, getFormControlsConfigForAddress} from '../_helpers/address.utils';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, private addressService: AddressService, private notificationService: NotificationService) {
  }



  ngOnInit(): void {
    this.initForm(createEmptyAddressObject());
  }

  initForm(user: Address): void {
    this.addressForm = this.formBuilder.group(getFormControlsConfigForAddress(user));

  }


  private onUpdateAddressComplete(address: Address) {

    this.notificationService.showSuccessMessage('Successfully Added Address');
    this.router.navigate(['/user/addresses']);
  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }



  public onAddressFormSubmit(): void {
    if (this.addressForm.valid) {
      const addressRequest: AddressRequest = getAddressRequestFromForm(this.addressForm);


      this.addressService.add(addressRequest).subscribe
      ((address: Address) => this.onUpdateAddressComplete(address),
        (error => this.onError(error)));


    }
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressService} from '../services/address.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {Address, AddressRequest} from '../../models/user.models';
import {map} from 'rxjs/operators';
import {getAddressRequestFromForm, getFormControlsConfigForAddress} from '../_helpers/address.utils';
import {onStateVariablesReceive} from '../../../_shared/_helpers/router.utils';



@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  addressForm: FormGroup;
  addressId: any;
  isLoaded = false;


  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, private addressService: AddressService, private notificationService: NotificationService) {


  }



  ngOnInit(): void {

    onStateVariablesReceive(this.activatedRoute).subscribe((res) => {
      this.onParameterLoaded(res);
    }, (error => console.log(error)));

  }




  private onParameterLoaded(res: any) {


    if (res && res.address) {
      const address = res.address;
      this.addressId = address.id;
      this.initForm(address);
      this.isLoaded = true;
    }else {
      this.goBackToAddressList();
    }
  }

  initForm(address: Address): void {
    this.addressForm = this.formBuilder.group(getFormControlsConfigForAddress(address));

  }




  private onUpdateAddressComplete(address: Address) {

    this.notificationService.showSuccessMessage('Successfully Updated Address');
    this.goBackToAddressList();
  }

  private goBackToAddressList() {
    this.router.navigate(['/user/addresses']);
  }

  private onError(error: any) {
    this.notificationService.showErrorMessage(error);
  }



  public onAddressFormSubmit(): void {
    if (this.addressForm.valid) {
      const addressRequest: AddressRequest = getAddressRequestFromForm(this.addressForm);


      this.addressService.update(this.addressId, addressRequest).subscribe
      ((address: Address) => this.onUpdateAddressComplete(address),
        (error => this.onError(error)));


    }
  }


}

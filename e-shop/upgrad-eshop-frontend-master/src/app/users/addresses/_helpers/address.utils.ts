import {Address, AddressRequest} from '../../models/user.models';
import {FormGroup, Validators} from '@angular/forms';
import {getAsUser} from '../../../auth/models/auth.models';

export function getFormControlsConfigForAddress(address: Address) {
  return {
    name: [address.name, Validators.compose([Validators.required, Validators.minLength(3)])],
    street: [address.street, Validators.compose([Validators.required, Validators.minLength(3)])],
    landmark: [address.landmark, Validators.compose([])],
    city: [address.city, Validators.compose([Validators.required])],
    state: [address.state, Validators.compose([Validators.required])],
    zipcode: [address.zipcode, Validators.compose([Validators.required])],
    phone: [address.phone, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])]
  };
}


export function getAddressRequestFromForm(currentAddressForm: FormGroup) {
  return new AddressRequest({
    name: currentAddressForm.controls.name.value,
    street: currentAddressForm.controls.street.value,
    city: currentAddressForm.controls.city.value,
    landmark: currentAddressForm.controls.landmark.value,
    phone: currentAddressForm.controls.phone.value,
    state: currentAddressForm.controls.state.value,
    zipcode: currentAddressForm.controls.zipcode.value,
  });
}

export function createEmptyAddressObject() {
  return new Address({
    name: '',
    street: '',
    city: '',
    landmark: '',
    phone: '',
    state: '',
    zipcode: '',

  });
}
export function createAddressFrom(addressObject) {
  return new Address({
    id: addressObject.id,
    name: addressObject.name,
    city: addressObject.city,
    landmark: addressObject.landmark,
    phone: addressObject.phone,
    state: addressObject.state,
    street: addressObject.street,
    zipcode: addressObject.zipcode,


  });
}

export function createAddressesFrom(addressObjects) {

  if(addressObjects) {
    return addressObjects.map(rawUser => {
      return createAddressFrom(rawUser);
    });
  }else {
    return [];
  }


}

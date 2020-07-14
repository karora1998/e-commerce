import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Address} from '../../models/user.models';
import {AddressService} from '../services/address.service';
import {NotificationService} from '../../../_shared/_services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss']
})
export class ChooseAddressComponent implements OnInit {


  addresses: Observable<Address[]>;

  selectedAddress: Address;
  showSelectAddressError = false;
  @Output() onComplete: EventEmitter<Address> = new EventEmitter<any>();

  constructor(private addressService: AddressService, private notificationService: NotificationService, private router: Router) {


  }


  ngOnInit(): void {
    this.reloadAddresses();
  }


  reloadAddresses() {
    this.addresses = this.addressService.getAddresses();
  }


  add() {
    this.router.navigate(['/user/addresses/add']);
  }

  select(address: Address) {
    this.selectedAddress = address;
    this.showSelectAddressError = false;
  }

  onContinue() {
    if (this.selectedAddress) {

      this.onComplete.emit(this.selectedAddress);
    } else {
      this.showSelectAddressError = true;
    }
  }

  isSelected(address: Address) {
    return (this.selectedAddress && address.id === this.selectedAddress.id) ;
  }
}

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Address} from '../models/user.models';
import {ProductService} from '../../products/services/product.service';
import {NotificationService} from '../../_shared/_services/notification.service';
import {AppDataService} from '../../_shared/_services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AddressService} from './services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {


  addresses: Observable<Address[]>;

  constructor(private addressService: AddressService, private notificationService: NotificationService, private router: Router) {


  }


  ngOnInit(): void {
    this.reloadAddresses();
  }

  edit(address: Address) {

    this.router.navigateByUrl('/user/addresses/edit', { state: {address } });
  }

  reloadAddresses() {
    this.addresses = this.addressService.getAddresses();
  }

  private onDeleteComplete(value) {

    this.notificationService.showSuccessMessage('Successfully Deleted Address');
    this.reloadAddresses();
  }

  private onDeleteError(error: any) {
    this.notificationService.showErrorMessage(error);
  }


  deleteAddress(id) {


    this.addressService.delete(id)
      .subscribe(value => this.onDeleteComplete(value),
        (error => this.onDeleteError(error)));
  }

  delete(id) {

    this.notificationService.confirm('Do you want to Delete ?')
      .then((res) => {

        this.deleteAddress(id);
      });
  }

  add() {
    this.router.navigate(['/user/addresses/add']);
  }
}

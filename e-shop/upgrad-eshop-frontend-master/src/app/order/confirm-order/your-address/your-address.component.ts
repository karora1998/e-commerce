import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../../../users/models/user.models';

@Component({
  selector: 'app-your-address',
  templateUrl: './your-address.component.html',
  styleUrls: ['./your-address.component.scss']
})
export class YourAddressComponent implements OnInit {

  @Input() address: Address;
  constructor() { }

  ngOnInit(): void {
  }

}

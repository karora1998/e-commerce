import {Component, Input, OnInit} from '@angular/core';
import {CartItem} from '../../../cart/models/cart.models';

@Component({
  selector: 'app-your-items',
  templateUrl: './your-items.component.html',
  styleUrls: ['./your-items.component.scss']
})
export class YourItemsComponent implements OnInit {

  @Input()   cartItems: CartItem[];
  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from '../models/order.models';
import {Address} from '../../users/models/user.models';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  @Input() order: Order;

  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  @Output() onReload: EventEmitter<Order> = new EventEmitter<any>();



  constructor() {
  }

  ngOnInit(): void {

  }


}

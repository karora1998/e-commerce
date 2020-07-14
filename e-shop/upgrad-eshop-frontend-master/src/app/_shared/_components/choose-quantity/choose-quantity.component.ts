import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-choose-quantity',
  templateUrl: './choose-quantity.component.html',
  styleUrls: ['./choose-quantity.component.scss']
})
export class ChooseQuantityComponent implements OnInit {

  @Input() availableItems: number;

  @Output() onCountChange: EventEmitter<any> = new EventEmitter();
  @Input() count = 1;

  constructor(private notificationService: NotificationService) {


  }

  ngOnInit(): void {
  }

  emitCountEvent() {

    this.onCountChange.emit(this.count);
  }

  public increment() {
    if (this.count < this.availableItems) {
      this.count++;
      this.emitCountEvent();

    } else {
      this.notificationService.showErrorMessage('Items Not In Stock, There are only' + this.count + ' Items');

    }
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      this.emitCountEvent();
    }
  }

}

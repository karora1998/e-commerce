import {Component, OnInit} from '@angular/core';
import {AppDataService} from 'src/app/_shared/_services/app-data.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  cartItemsCount=0;


  constructor(private userAuthService: AppDataService, private router: Router, private notificationService: NotificationService) {


  }

  ngOnInit(): void {

    this.userAuthService.cartItemsCount$.subscribe(count => this.cartItemsCount = count);


  }

  redirect() {
    console.log(this.cartItemsCount )
    if (this.cartItemsCount > 0) {

      this.router.navigate(['/orders']);
    } else {
      this.notificationService.showErrorMessage('No Items in cart');
    }
  }
}

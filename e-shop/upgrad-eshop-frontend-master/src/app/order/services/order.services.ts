import {getAsOrder, getAsOrders, Order} from '../models/order.models';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {getOptionsForTextResponse} from '../../_shared/_helpers/http.utils';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) {
  }


  create(addressId): Observable<Order> {

    const orderRequest = {addressId};

    const url = environment.baseUrl + '/orders';
    return this.http.post(url, orderRequest).pipe(
      map((orderObject: any) => getAsOrder(orderObject))
    );
  }

  applyCoupon(orderId, couponCode): Observable<Order> {

    const couponApplyRequest = {
      couponCode,
      orderId
    };


    const url = environment.baseUrl + '/orders/applycoupon';
    return this.http.put(url, couponApplyRequest).pipe(
      map((orderObject: any) => getAsOrder(orderObject))
    );
  }

  delete(id): Observable<string> {


    const url = environment.baseUrl + '/orders/' + id;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url, options);

  }


  getOrderById(id): Observable<Order> {


    const url = environment.baseUrl + '/orders/' + id;
    return this.http.get(url).pipe(
      map((orderObject: any) => getAsOrder(orderObject))
    );

  }

  getActiveOrder(): Observable<Order> {


    const url = environment.baseUrl + '/orders/active';
    return this.http.get(url).pipe(
      map((orderObject: any) => getAsOrder(orderObject))
    );

  }

  getOrders(): Observable<Order[]> {


    const url = environment.baseUrl + '/orders';
    return this.http.get(url).pipe(
      map((orderObject: any) => getAsOrders(orderObject))
    );

  }

}

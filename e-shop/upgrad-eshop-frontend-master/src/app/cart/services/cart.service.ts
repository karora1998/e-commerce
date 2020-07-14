import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cart, CartItemRequest, createCartFrom} from '../models/cart.models';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {getOptionsForTextResponse} from '../../_shared/_helpers/http.utils';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) {
  }


  update(productId, quantity: number): Observable<Cart> {

    const cartItemRequest = new CartItemRequest({
      productId,
      quantity
    });

    const url = environment.baseUrl + '/cart';

    return this.http.put(url, cartItemRequest).pipe(
      map((cartObject: any) => createCartFrom(cartObject))
    );
  }


  addToCart(productId, quantity: number): Observable<Cart> {
    const cartItemRequest = new CartItemRequest({
      productId,
      quantity
    });
    const url = environment.baseUrl + '/cart';
    return this.http.post(url, cartItemRequest).pipe(
      map((cartObject: any) => createCartFrom(cartObject))
    );
  }


  removeFromCart(productId): Observable<Cart> {

    const url = environment.baseUrl + '/cart/' + productId;
    return this.http.delete(url).pipe(
      map((cartObject: any) => createCartFrom(cartObject))
    );
  }

  removeAll(): Observable<string> {

    const url = environment.baseUrl + '/cart';
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url, options);

  }


  getCart(): Observable<Cart> {


    const url = environment.baseUrl + '/cart';
    return this.http.get(url).pipe(
      map((cartObject: any) => createCartFrom(cartObject))
    );

  }


}

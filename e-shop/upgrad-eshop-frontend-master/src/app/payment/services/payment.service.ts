import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../order/models/order.models';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {getAsPayment, Payment, RazorPayCompleteRequest} from '../models/payment.models';
import {getOptionsForTextResponse} from '../../_shared/_helpers/http.utils';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Payment> {

    const paymentRequest = {orderId: order.id};

    const url = environment.baseUrl + '/payments';
    return this.http.post(url, paymentRequest).pipe(
      map((paymentObject: any) => getAsPayment(paymentObject, order))
    );
  }

  retrievePaymentByOrder(order: Order): Observable<Payment> {

    const url = environment.baseUrl + '/payments/byorder/' + order.id;
    return this.http.get(url).pipe(
      map((paymentObject: any) => getAsPayment(paymentObject, order))
    );
  }


  verifyAndUpdatePaymentDetails(razorPayCompleteRequest: RazorPayCompleteRequest): Observable<string> {


    const url = environment.baseUrl + '/payments/razorpay/oncomplete';
    const options = getOptionsForTextResponse();

    return this.http.post<string>(url, razorPayCompleteRequest, options);
  }


}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {getOptionsForTextResponse} from '../../../_shared/_helpers/http.utils';
import {DealRequest} from '../_helpers/manage-product.models';
import {Deal, getAsDeal} from '../../../products/models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ManageDealService {

  constructor(private http: HttpClient) {
  }

  add(dealRequest: DealRequest): Observable<Deal> {



    const url = environment.baseUrl + '/deals';
    return this.http.post(url, dealRequest).pipe(
      map((dealObject: any) => getAsDeal(dealObject))
    );
  }

  update(id, dealRequest: DealRequest): Observable<Deal> {


    const url = environment.baseUrl + '/deals/' + id;
    return this.http.put(url, dealRequest).pipe(
      map((dealObject: any) => getAsDeal(dealObject))
    );
  }

  delete(productId): Observable<string> {


    const url = environment.baseUrl + '/deals/' + productId;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url,  options);

  }




}

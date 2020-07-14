import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {getOptionsForTextResponse} from '../../../_shared/_helpers/http.utils';
import {getAsProduct, Product} from '../../../products/models/product.models';
import {ProductRequest} from '../_helpers/manage-product.models';

@Injectable({
  providedIn: 'root'
})
export class ManageProductService {

  constructor(private http: HttpClient) {
  }

  add(productRequest: ProductRequest): Observable<Product> {



    const url = environment.baseUrl + '/products';
    return this.http.post(url, productRequest).pipe(
      map((productObject: any) => getAsProduct(productObject))
    );
  }

  update(id, productRequest: ProductRequest): Observable<Product> {


    const url = environment.baseUrl + '/products/' + id;
    return this.http.put(url, productRequest).pipe(
      map((productObject: any) => getAsProduct(productObject))
    );
  }

  delete(id): Observable<string> {


    const url = environment.baseUrl + '/products/' + id;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url,  options);

  }




}

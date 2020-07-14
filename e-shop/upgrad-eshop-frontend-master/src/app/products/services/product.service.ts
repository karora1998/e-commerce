import {Injectable} from '@angular/core';


import {Observable} from 'rxjs';
import {getAsProduct, Product, ProductResponse, ProductSearchRequest} from '../models/product.models';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {asQueryString} from '../../_shared/_helpers/string.utils';
import {getPagination} from '../../_shared/_models/shared.mappers';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }




  search(productSearchRequest: ProductSearchRequest): Observable<ProductResponse> {

    const url = environment.baseUrl + '/products' + asQueryString(productSearchRequest);

    return this.http.get(url)
      .pipe(
        map((response) => this.convertToProductResponse(response, productSearchRequest))
      );
  }

  convertToProductResponse(response: any, productSearchRequest: ProductSearchRequest) {
    const productResponse = new ProductResponse({
      pageable: getPagination(response, productSearchRequest),
      products: this.getProducts(response.content)
    });
    return productResponse;
  }


  private getProducts(rawProducts: any) {
    return rawProducts.map(rawproduct => {
      return getAsProduct(rawproduct);
    });
  }



  byId(id): Observable<Product> {
    const url = environment.baseUrl + '/products/' + id;
    return this.http.get<Product>(url);
  }



  getCategories() {

    const url = environment.baseUrl + '/products/categories';
    return this.http.get(url);


  }
}

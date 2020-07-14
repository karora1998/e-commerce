import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getAsProduct, Product} from '../../products/models/product.models';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {asQueryString} from '../../_shared/_helpers/string.utils';
import {map} from 'rxjs/operators';
import { PageRequest, PageResponse} from '../../_shared/_models/shared.models';
import {getPagination} from '../../_shared/_models/shared.mappers';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private http: HttpClient) {
  }


  getAll( pageRequest: PageRequest): Observable<PageResponse<Product>> {

    const url = environment.baseUrl + '/deals' + asQueryString(pageRequest);

    return this.http.get(url)
      .pipe(
        map((response) => this.convertToPageResponse(response, pageRequest))
      );
  }

  convertToPageResponse(response: any, pageRequest: PageRequest) {
    const productResponse = new PageResponse<Product>({
      pageable: getPagination(response, pageRequest),
      items: this.getProducts(response.content)
    });
    return productResponse;
  }


  private getProducts(rawProducts: any) {

    return rawProducts.map(rawproduct => {
      return getAsProduct(rawproduct.product);
    });

  }

}

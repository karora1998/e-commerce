import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {getOptionsForTextResponse} from '../../../_shared/_helpers/http.utils';
import {HttpClient} from '@angular/common/http';
import {asQueryString} from '../../../_shared/_helpers/string.utils';
import {map} from 'rxjs/operators';
import {PageRequest, PageResponse} from '../../../_shared/_models/shared.models';
import {Coupon, CouponRequest, getAsCoupon, getAsCoupons} from '../models/coupon.models';
import {getPagination} from '../../../_shared/_models/shared.mappers';

@Injectable({
  providedIn: 'root'
})
export class CouponService {


  constructor(private http: HttpClient) {
  }

  getAll(pageRequest: PageRequest): Observable<PageResponse<Coupon>> {

    const url = environment.baseUrl + '/coupons' + asQueryString(pageRequest);

    return this.http.get(url)
      .pipe(
        map((response) => this.convertToPageResponse(response, pageRequest))
      );

  }


  convertToPageResponse(response: any, pageRequest: PageRequest) {
    const productResponse = new PageResponse<Coupon>({
      pageable: getPagination(response, pageRequest),
      items: getAsCoupons(response.content)
    });
    return productResponse;
  }






  add( couponRequest: CouponRequest) {
    const url = environment.baseUrl + '/coupons'
    return this.http.post(url, couponRequest)
      .pipe(
        map((userObject: any) => getAsCoupon(userObject)));
  }



  delete(couponId): Observable<string> {


    const url = environment.baseUrl + '/coupons/' + couponId;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url, options);

  }
}

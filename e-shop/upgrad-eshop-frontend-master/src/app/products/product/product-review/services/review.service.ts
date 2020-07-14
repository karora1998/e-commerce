import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getAsProduct, Product} from '../../../models/product.models';
import {environment} from '../../../../../environments/environment';
import {asQueryString} from '../../../../_shared/_helpers/string.utils';
import {map} from 'rxjs/operators';
import {getOptionsForTextResponse} from '../../../../_shared/_helpers/http.utils';
import {getAsReview, Review, ReviewRequest} from '../models/review.models';
import {getAsUser} from '../../../../auth/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getProductReviews(product: Product): Observable<Review[]> {

    const url = environment.baseUrl + '/reviews/' + asQueryString(product);

    return this.http.get(url)
      .pipe(
        map((response) => this.getReviews(response))
      );

  }

  delete(productId): Observable<string> {


    const url = environment.baseUrl + '/reviews/' + productId;
    const options = getOptionsForTextResponse();
    return this.http.delete<string>(url, options);

  }

  private getReviews(reviews: any) {
    return reviews.content.map(review => {
      return getAsReview(review);
    });
  }



  add(reviewRequest: ReviewRequest): Observable<Review> {


    const url = environment.baseUrl + '/reviews';
    return this.http.post(url, reviewRequest).pipe(
      map((reviewObject: any) => getAsReview(reviewObject))
    );
  }


}

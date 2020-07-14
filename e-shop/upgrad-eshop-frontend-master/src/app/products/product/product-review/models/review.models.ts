
import {getAsUser, User} from '../../../../auth/models/auth.models';
import {getAsProduct, Product} from '../../../models/product.models';

export class Review {
  public id: number;
  public rating: number;
  public comment: string;
  public updated: Date;
  public user: User;
  public product: Product;

  constructor(obj: Partial<Review> = {}) {

    Object.assign(this, obj);

  }

}

export class ReviewRequest {


  public comment = '';
  public productId: number;
  public rating: number;


  constructor(obj: Partial<ReviewRequest> = {}) {

    Object.assign(this, obj);

  }


}

export function getAsReview(review: any): Review {
  return new Review({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    updated: new Date(review.updated),
    user: getAsUser(review.user),
    product: getAsProduct(review.product)
  });
}

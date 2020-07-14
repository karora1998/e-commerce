import {Cart, CartItem, createCartFrom} from '../cart/models/cart.models';
import {cloneObjectFrom} from './utils.mock';
import {Observable, of} from 'rxjs';
import {CartService} from '../cart/services/cart.service';

const cartResponse = {
  'id': 34,
  'cartItems': [{
    'id': 98,
    'product': {
      'productId': 50,
      'name': 'Sathiyas Cotton Bath Towel',
      'category': 'Baby Care',
      'price': 600.0,
      'dealPrice': 543.0,
      'description': 'Specifications of Sathiyas Cotton Bath Towel (3 Bath Towel  Red  Yellow  Blue) Bath Towel Features Machine Washable Yes Material Cotton Design Self Design General Brand Sathiyas Type Bath Towel GSM 500 Model Name Sathiyas cotton bath towel Ideal For Men  Women  Boys  Girls Model ID asvtwl322 Color Red  Yellow  Blue Size Mediam Dimensions Length 30 inch Width 60 inch In the Box Number of Contents in Sales Package 3 Sales Package 3 Bath Towel',
      'manufacturer': 'Sathiyas',
      'availableItems': 25,
      'overAllRating': 3.25,
      'imageUrl': 'http://img6a.flixcart.com/image/bath-towel/z/u/h/asvtwl322-sathiyas-sathiyas-cotton-bath-towel-original-imaegyryachkkfac.jpeg',
      'created': '2020-04-24T22:57:36.895',
      'updated': '2020-04-24T22:57:36.895'
    },
    'quantity': 1
  }, {
    'id': 97,
    'product': {
      'productId': 121,
      'name': 'Kielz Ladies Boots',
      'category': 'Footwear',
      'price': 2499.0,
      'dealPrice': 0.0,
      'description': 'Kielz Ladies Boots - Buy Kielz Ladies Boots - 1008-B62 only for Rs. 1149 from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery!',
      'manufacturer': 'HomeMade',
      'availableItems': 25,
      'overAllRating': 2.75,
      'imageUrl': 'http://img5a.flixcart.com/image/shoe/a/q/5/beige-1008-b62-kielz-40-original-imaef9c4ytbryhqm.jpeg',
      'created': '2020-04-24T22:57:36.897',
      'updated': '2020-04-24T22:57:36.897'
    },
    'quantity': 2
  }],
  'user': {
    'id': 1,
    'userName': 'user',
    'created': '2020-04-24T22:57:36.385',
    'updated': '2020-04-24T22:57:36.385',
    'firstName': 'user',
    'email': 'user@upgrad.com',
    'lastName': '',
    'phoneNumber': '9629150400',
    'roles': [{'id': 1, 'name': 'USER', 'description': null}],
    'addresses': []
  },
  'status': 'ACTIVE'
};

export function getMockedCartWithData(): Cart {

  return createCartFrom(cartResponse);
}

export function getMockedCartItem(): CartItem {

  return getMockedCartWithData().cartItems[0];
}

export function getUpdatedCartItemResponse(cartItem, quantity) {

  const cart = getMockedCartWithEmptyResponse();

  cartItem.quantity = quantity;
  cart.cartItems.push(cartItem);
  return cart;
}

export function getMockedCartResponse() {

  return cartResponse;
}

export function getMockedCartWithEmptyResponse() {

  const updatedCartResponse = cloneObjectFrom(cartResponse)
  updatedCartResponse.cartItems=[]
  return updatedCartResponse;
}

export function getMockedCartWithEmptyData(): Cart {

  const cart: Cart = cloneObjectFrom(createCartFrom(cartResponse));
  cart.cartItems = [];
  return cart;
}

export function getMockedCartService() {

  let mockedCartService: Partial<CartService>;

  mockedCartService = {

    getCart: (): (Observable<Cart>) => {

      return of(getMockedCartWithData());
    },

  };

  return mockedCartService;

}


import {getAsProduct, Product} from '../../products/models/product.models';
import {User} from '../../auth/models/auth.models';

export class Cart {
  public id;
  public cartItems: CartItem[];
  public status:string;
  public user: User;


  constructor(obj: Partial<Cart> = {}) {
    Object.assign(this, obj);
  }
}

export class CartItem {
  public id;
  public product: Product;
  public quantity;


  constructor(obj: Partial<CartItem> = {}) {
    Object.assign(this, obj);
  }
}

export class CartItemRequest {
  public productId;
  public quantity;

  constructor(obj: Partial<CartItemRequest> = {}) {
    Object.assign(this, obj);
  }
}


export function createCartItem(rawCartItem): CartItem {
  return new CartItem({
    id: rawCartItem.id,
    quantity: rawCartItem.quantity,
    product: getAsProduct(rawCartItem.product)
  });
}

export function createCartItemsFrom(rawcartItems): CartItem[] {

  return rawcartItems.map(cartItem => {
    return createCartItem(cartItem);
  }).sort((x, y) => x.id > y.id);

}

export function createCartFrom(rawCartObject): Cart {
  return new Cart({
    id: rawCartObject.id,
    cartItems: createCartItemsFrom(rawCartObject.cartItems)
  });
}

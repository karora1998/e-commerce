import {Address} from '../../users/models/user.models';
import {Coupon, getAsCoupons} from '../../admin/coupons/models/coupon.models';
import {Cart, createCartFrom} from '../../cart/models/cart.models';
import {createAddressFrom} from '../../users/addresses/_helpers/address.utils';
import {getAsUser} from '../../auth/models/auth.models';


export enum OrderStatus {
  NEW, WAITING_FOR_PAYMENT, CANCELLED, PAYMENT_COMPLETED
}


export function getOrderStatusByName(statusName) {

  console.log("getOrderStatusByName",statusName)
  const allStatuses = {
    'NEW': OrderStatus.NEW,
    'WAITING_FOR_PAYMENT': OrderStatus.WAITING_FOR_PAYMENT,
    'CANCELLED': OrderStatus.CANCELLED,
    'PAYMENT_COMPLETED': OrderStatus.PAYMENT_COMPLETED

  };
  return allStatuses[statusName.toUpperCase()];

}


export class Order {
  public amount: number;
  public cart: Cart;
  public finalAmount: number;
  public id: number;
  public orderDate: Date;
  public shippingAddress: Address;
  public status: OrderStatus;
  public statusTxt;
  public user;
  public coupons: Coupon[];

  constructor(obj: Partial<Order> = {}) {

    Object.assign(this, obj);

  }

}


export function getAsOrders(orderObjects) {

  return orderObjects.map(orderObject => {
    return getAsOrder(orderObject);
  });

}


export function getAsOrder(orderObject) {
  return new Order({
    id: orderObject.id,
    amount: orderObject.amount,
    finalAmount: orderObject.finalAmount,
    orderDate: new Date(orderObject.orderDate),
    shippingAddress: createAddressFrom(orderObject.shippingAddress),
    status: getOrderStatusByName(orderObject.status),
    statusTxt: orderObject.status,
    cart: createCartFrom(orderObject.cart),
    user: getAsUser(orderObject.user),
    coupons: getAsCoupons(orderObject.coupons)


  });
}

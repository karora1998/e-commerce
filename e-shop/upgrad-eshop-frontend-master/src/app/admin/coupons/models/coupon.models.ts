export enum STATUS {
  ACTIVE, APPLIED

}

export class Coupon {

  public id;
  public name;
  public couponCode;
  public amount: number;
  public status: string;
  public statusCode: string;


  constructor(obj: Partial<Coupon> = {}) {
    Object.assign(this, obj);
  }


}



export function getAsCoupon(rawCoupon) {
  return new Coupon({
    id: rawCoupon.id,
    name: rawCoupon.name,
    couponCode: rawCoupon.couponCode,
    amount: rawCoupon.amount,
    statusCode: getStatusByName(rawCoupon.status),
    status: rawCoupon.status
  });
}

export function getStatusByName(name) {

  const allStatuses = {
    'ACTIVE': STATUS.ACTIVE,
    'APPLIED': STATUS.APPLIED
  };
  return allStatuses[name.toUpperCase()];

}

export function getAsCoupons(rawCoupons: any) {

  return rawCoupons.map(rawCoupon => {
    return getAsCoupon(rawCoupon);
  });

}

export class CouponRequest {


  public name;
  public amount: number;


  constructor(obj: Partial<CouponRequest> = {}) {
    Object.assign(this, obj);
  }


}





import {User} from '../../auth/models/auth.models';

export class Product {
  public productId: number;
  public name: string;
  public category: string;
  public price: number;
  public dealPrice: number;
  public description: string;
  public manufacturer: string;
  public availableItems: number;
  public overAllRating: number;
  public imageUrl: string;
  public created: Date;
  public updated: Date;
  public calculatedPrice: number;

  constructor(obj: Partial<Product> = {}) {

    Object.assign(this, obj);

  }


}

export class Pageable {
  public pageNo: number;
  public sortBy: string;
  public sortDirection: string;
  public total: number;
  public itemsPerPage: number;
  public totalPages: number;


  constructor(obj: Partial<Pageable> = {}) {

    Object.assign(this, obj);

  }


}


export class ProductResponse {
  public products: Product[];
  public pageable: Pageable;


  constructor(obj: Partial<ProductResponse> = {}) {

    Object.assign(this, obj);

  }
}


export class ProductSearchRequest {
  public name = '';
  public category = '';
  public overAllRating: number;
  public pageNo = 0;
  public pageSize = 10;
  public sortBy = '';
  public direction = 'DESC';


  constructor(obj: Partial<ProductSearchRequest> = {}) {

    Object.assign(this, obj);

  }


}

export class Deal {

  public id: number;
  public dealPrice: number;
  public product: Product;

  constructor(obj: Partial<Deal> = {}) {

    Object.assign(this, obj);

  }


}


function getCalculatedPrice(rawproduct: any) {
  if (rawproduct.dealPrice !== 0) {
    return rawproduct.dealPrice;
  } else {
    return rawproduct.price;
  }
}

export function getAsProduct(rawproduct) {
  return new Product({
    productId: rawproduct.productId,
    name: rawproduct.name,
    category: rawproduct.category,
    price: rawproduct.price,
    dealPrice: rawproduct.dealPrice,
    calculatedPrice: getCalculatedPrice(rawproduct),
    description: rawproduct.description,
    manufacturer: rawproduct.manufacturer,
    availableItems: rawproduct.availableItems,
    overAllRating: rawproduct.overAllRating,
    imageUrl: rawproduct.imageUrl,
    created: new Date(rawproduct.created),
    updated: new Date(rawproduct.updated)
  });
}

export function getAsDeal(rawdeal) {
  return new Deal({
    product: getAsProduct(rawdeal.product),
    id: rawdeal.id,
    dealPrice: rawdeal.dealPrice,
  });
}

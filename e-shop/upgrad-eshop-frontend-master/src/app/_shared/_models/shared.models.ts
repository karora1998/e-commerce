import {Pageable, Product, ProductSearchRequest} from '../../products/models/product.models';

export class PageRequest {

  public pageNo = 0;
  public pageSize = 10;
  public sortBy = '';
  public direction = 'DESC';


  constructor(obj: Partial<PageRequest> = {}) {

    Object.assign(this, obj);

  }


}


export class PageResponse<T> {
  public items: T[];
  public pageable: Pageable;


  constructor(obj: Partial<PageResponse<T>> = {}) {

    Object.assign(this, obj);

  }
}

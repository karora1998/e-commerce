

export class ProductRequest {


public availableItems: number;
public category: string;
public description: string;
public imageUrl: string;
public manufacturer: string;
public name: string;
public price: number;


  constructor(obj: Partial<ProductRequest> = {}) {

    Object.assign(this, obj);

  }



}


export class DealRequest {


public productId: number;
public price: number;


  constructor(obj: Partial<DealRequest> = {}) {

    Object.assign(this, obj);

  }



}



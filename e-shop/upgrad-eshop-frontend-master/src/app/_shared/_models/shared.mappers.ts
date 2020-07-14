import {Pageable} from '../../products/models/product.models';





export function getPagination(response: any, productSearchRequest: any) {
  const pageable: Pageable = new Pageable({
    itemsPerPage: response.numberOfElements,
    pageNo: response.pageable.pageNumber,
    sortBy: productSearchRequest.sortBy,
    sortDirection: productSearchRequest.direction,
    total: response.totalElements,
    totalPages: response.totalPages
  });
  return pageable;
}

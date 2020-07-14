package com.upgrad.eshop.product.search;

import com.upgrad.eshop.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SearchRepository {
    Page<Product> searchProduct(SearchRequest searchRequest);
}

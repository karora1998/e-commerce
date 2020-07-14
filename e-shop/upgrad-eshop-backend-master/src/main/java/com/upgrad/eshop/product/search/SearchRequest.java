package com.upgrad.eshop.product.search;

import com.upgrad.eshop.utils.PaginationRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest extends PaginationRequest {
    private String name;
    private String category;
    private Double overAllRating;

    public SearchRequest(){
        super();
        this.sortBy="updated";


    }






}

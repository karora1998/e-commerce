package com.upgrad.eshop.review.models;

import com.upgrad.eshop.utils.PaginationRequest;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsForProductRequest extends PaginationRequest {

    @ApiModelProperty(example = "1")
    @Positive
    private Long productId;


    public ReviewsForProductRequest(@Positive Long productId) {
        this.productId = productId;
    }

}

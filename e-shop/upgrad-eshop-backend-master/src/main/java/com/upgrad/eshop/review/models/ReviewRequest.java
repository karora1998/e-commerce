package com.upgrad.eshop.review.models;

import com.upgrad.eshop.utils.PaginationRequest;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class ReviewRequest {

    @ApiModelProperty(example = "1")
    @Positive
    private Long productId;

    @ApiModelProperty(example = "Wonderful Product")
    private String comment="";

    @ApiModelProperty(example = "5")
    @Positive
    @Max(5)
    @Min(0)
    private Integer rating=0;
}

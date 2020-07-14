package com.upgrad.eshop.deal.models;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class DealRequest {

    @ApiModelProperty(example = "1")
    @Positive
    private Long productId;

    @ApiModelProperty(example = "50")
    @Positive
    @Min(1)
    private Double price;
}

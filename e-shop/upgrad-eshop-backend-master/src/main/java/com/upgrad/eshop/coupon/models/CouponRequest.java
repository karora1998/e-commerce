package com.upgrad.eshop.coupon.models;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;

@Getter
@Setter
public class CouponRequest {

    @ApiModelProperty(example = "50")
    @Positive
    @Min(50)
    private Long amount;

    @ApiModelProperty(example = "HappyHours")
    private String name="HappyHours";
}

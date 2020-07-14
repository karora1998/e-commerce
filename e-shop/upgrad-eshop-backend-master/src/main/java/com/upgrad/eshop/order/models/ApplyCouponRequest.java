package com.upgrad.eshop.order.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ApplyCouponRequest {

    @NotNull
    private Long orderId;

    @NotNull
    private String couponCode;

    public ApplyCouponRequest() {
    }

    public ApplyCouponRequest(@NotNull Long orderId, @NotNull String couponCode) {
        this.orderId = orderId;
        this.couponCode = couponCode;
    }
}


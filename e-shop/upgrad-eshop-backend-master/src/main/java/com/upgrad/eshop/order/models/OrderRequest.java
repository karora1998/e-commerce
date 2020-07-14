package com.upgrad.eshop.order.models;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class OrderRequest {

    @NotNull
    private Long addressId;

    public OrderRequest() {
    }

    public OrderRequest(@NotNull Long addressId) {
        this.addressId = addressId;
    }
}


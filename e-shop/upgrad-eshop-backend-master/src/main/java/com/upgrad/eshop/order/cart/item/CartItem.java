package com.upgrad.eshop.order.cart.item;

import com.upgrad.eshop.product.Product;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;

@Entity
@Getter
@Setter
public class CartItem {

    private static final int defaultQuantity = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty()
    @OneToOne
    private Product product;

    @ApiModelProperty(example = "1")
    private int quantity;


    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", product=" + product +
                ", quantity=" + quantity +
                '}';
    }
}

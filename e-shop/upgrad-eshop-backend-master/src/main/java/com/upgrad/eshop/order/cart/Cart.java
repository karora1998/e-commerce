package com.upgrad.eshop.order.cart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upgrad.eshop.order.Order;
import com.upgrad.eshop.order.cart.item.CartItem;
import com.upgrad.eshop.users.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Cart {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ApiModelProperty
    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.REFRESH,CascadeType.DETACH,CascadeType.REMOVE})
    Set<CartItem> cartItems = new HashSet<>();


    @OneToOne
    User user;

    CartStatus status;


}

package com.upgrad.eshop.order;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.order.cart.Cart;
import com.upgrad.eshop.order.models.OrderStatus;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.address.ShippingAddress;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ApiModelProperty()
    @OneToOne
    private Cart cart;

    @ApiModelProperty()
    @OneToOne
    private User user;

    @ApiModelProperty()
    @OneToOne
    private ShippingAddress shippingAddress;

    @ApiModelProperty(example = "1200.50")
    private Double amount;

    private Double finalAmount;


    @ApiModelProperty
    @OneToMany(fetch = FetchType.EAGER)
    Set<Coupon> coupons = new HashSet<>();

    @ApiModelProperty()
    private LocalDateTime orderDate= LocalDateTime.now();


    private OrderStatus status;


    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", shippingAddress=" + shippingAddress +
                ", amount=" + amount +
                ", finalAmount=" + finalAmount +
                ", orderDate=" + orderDate +
                ", status=" + status +
                ", user=" + user.getUserName() +
                '}';
    }
}

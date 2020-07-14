package com.upgrad.eshop.order.cart;

import com.upgrad.eshop.order.cart.item.CartItem;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static testutils.JsonLogger.getAsObjectOfType;

@RunWith(MockitoJUnitRunner.class)
class CartServiceTest {


    @InjectMocks
    CartService cartService;

    @Mock
    CartRepository cartRepository;


    public Set<CartItem> getCartItemsOtherThanProductId(Long productId, Set<CartItem> cartItems){

        return cartItems
                .stream()
                .filter(cartItem -> cartItem.getProduct().getProductId() != productId)
                .collect(Collectors.toSet());

    }
}
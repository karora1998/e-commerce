package com.upgrad.eshop.order.cart.item;

import com.upgrad.eshop.order.cart.Cart;
import com.upgrad.eshop.order.cart.CartService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static testutils.JsonLogger.getAsObjectOfType;

@RunWith(MockitoJUnitRunner.class)
class CartItemServiceTest {

    @InjectMocks
    CartItemService cartItemService;

    private static final Logger log = LoggerFactory.getLogger(CartItemServiceTest.class);
    @Test
    void deleteFromCart() {

        String json="{\"id\":12,\"cartItems\":[{\"id\":39,\"product\":{\"productId\":153,\"name\":\"Kielz Ladies Boots\",\"category\":\"Footwear\",\"price\":1899.0,\"dealPrice\":0.0,\"description\":\"Kielz Ladies Boots - Buy Kielz Ladies Boots - 168-9 only for Rs. 999 from Flipkart.com. Only Genuine Products. 30 Day Replacement Guarantee. Free Shipping. Cash On Delivery!\",\"manufacturer\":\"HomeMade\",\"availableItems\":25,\"overAllRating\":2.75,\"imageUrl\":\"http://img6a.flixcart.com/image/shoe/y/r/r/black-168-9-kielz-40-700x700-imaef9c2zdmbwybq.jpeg\",\"created\":\"2020-04-24T22:57:36.898\",\"updated\":\"2020-04-24T22:57:36.898\"},\"quantity\":1}],\"user\":{\"id\":1,\"userName\":\"user\",\"created\":\"2020-04-24T22:57:36.385\",\"updated\":\"2020-04-24T22:57:36.385\",\"firstName\":\"user\",\"email\":\"user@upgrad.com\",\"lastName\":\"\",\"phoneNumber\":\"9629150400\",\"roles\":[{\"id\":1,\"name\":\"USER\",\"description\":null}],\"addresses\":[]},\"status\":\"ACTIVE\"}\n";
        Cart cart = getAsObjectOfType(json,Cart.class);


        Set<CartItem> cartItems = cart.getCartItems();
        Set<CartItem> updated= getCartItemsOtherThanProductId(153L, cartItems);
        assertEquals(0,updated.size());
    }
    public Set<CartItem> getCartItemsOtherThanProductId(Long productId, Set<CartItem> cartItems){

        log.info("Inside");
        return cartItems
                .stream()
                .filter(cartItem -> {
                    log.info("Inside" +  cartItem.getProduct().getProductId());
                    log.info("Inside" +  productId);

                    return !cartItem.getProduct().getProductId().equals(productId);
                })
                .collect(Collectors.toSet());

    }
}
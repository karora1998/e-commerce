package com.upgrad.eshop.order.cart;


import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.order.cart.item.CartItem;
import com.upgrad.eshop.order.cart.item.CartItemRequest;
import com.upgrad.eshop.product.Product;

//All integration tests will use Jupiter API
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
//Read more on https://sormuras.github.io/blog/2018-09-13-junit-4-core-vs-jupiter-api.html

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.hamcrest.MatcherAssert.assertThat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import testutils.IntegrationTestRunner;

import javax.annotation.PostConstruct;
import java.util.List;

import static org.hamcrest.Matchers.*;

import static org.junit.jupiter.api.Assertions.*;
import static testutils.DataConverter.convertSetToList;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class CartControllerFeatureTest extends IntegrationTestRunner {


    private static final Logger log = LoggerFactory.getLogger(CartControllerFeatureTest.class);
    public static final int DEFAULT_QUANTITY = 2;

    @Autowired
    CartService cartService;

    @Autowired
    MockDataGenerator mockDataGenerator;

    String userToken;

    @PostConstruct
    public void init() {

        userToken = mockDataGenerator.getUserToken();
    }


    @AfterEach
    public void clearCart() {

        deleteWithToken("/cart", userToken, String.class, null);
    }


    @Test
    public void addingToCartWithNewProductShouldCreateCartWithOneItem() {


        Product product = getFirstProduct();

        int quantity = 2;
        CartItemRequest cartItemRequest = new CartItemRequest(product.getProductId(), quantity);

        log.info(cartItemRequest.toString());
        Cart cartForUser = postEntityWithToken("/cart", userToken, Cart.class, cartItemRequest);

        assertNotNull(cartForUser);
        log.info(cartForUser.toString());

        List<CartItem> cartItems = convertSetToList(cartForUser.getCartItems());

        assertNotNull(cartItems);


        assertThat(cartItems.size(), equalTo(1));

        assertThat(cartItems.get(0).getProduct(), equalTo(product));
        assertThat(cartItems.get(0).getQuantity(), equalTo(quantity));


    }

    private Product getFirstProduct() {
        return mockDataGenerator.getFirstProduct();
    }

    private Product getSecondProduct() {
        return mockDataGenerator.getSecondProduct();
    }

    @Test
    public void addingToCartTwiceWithDifferentProductIdsShouldCreateCartWithTwoItems() {


        Long firstProductId = getFirstProduct().getProductId();
        Long secondProductId = getSecondProduct().getProductId();


        Cart initialCart = assertItemsInCartWithAddToCartFor(firstProductId, 1);
        Cart cart = assertItemsInCartWithAddToCartFor(secondProductId, 2);


        assertThat(initialCart.getId(), equalTo(cart.getId()));


    }

    @Test
    public void addingToCartTwiceWithSameProductIdShouldCreateCartWithSingleItemsAndQuantityOfTheLastShouldBeUpdated() {


        Long firstProductId = getFirstProduct().getProductId();
        int updatedQuantity = 5;


        Cart initialCartResponse = assertItemsInCartWithAddToCartFor(firstProductId, 1,3);
        Cart anotherCartResponse = assertItemsInCartWithAddToCartFor(firstProductId, 1, updatedQuantity);


        assertThat(initialCartResponse.getId(), equalTo(anotherCartResponse.getId()));


        CartItem cartItem = getFromCartForProduct(firstProductId);

        assertNotNull(cartItem);
        assertThat(updatedQuantity, equalTo(cartItem.getQuantity()));
    }

    @Test
    public void updatingCartShouldUpdateTheQuantity() {


        Long firstProductId = getFirstProduct().getProductId();



        Cart initialCartResponse = assertItemsInCartWithAddToCartFor(firstProductId, 1,3);

        int updatedQuantity = 8;
        Cart updatedCartResponse = assertItemsInCartWithUpdateToCartRequest(firstProductId, 1, updatedQuantity);


        assertThat(initialCartResponse.getId(), equalTo(updatedCartResponse.getId()));




        CartItem cartItem = getFromCartForProduct(firstProductId);

        assertNotNull(cartItem);
        assertThat(updatedQuantity, equalTo(cartItem.getQuantity()));

    }

    @Test
    public void deletingItemFromCartShouldDeleteTheItem() {


        Long firstProductId = getFirstProduct().getProductId();



        Cart initialCartResponse = assertItemsInCartWithAddToCartFor(firstProductId, 1,3);


        Cart cart = deleteWithToken("/cart/"+firstProductId, userToken, Cart.class, null);



        CartItem cartItem = getFromCartForProduct(firstProductId);

        assertNull(cartItem);

    }

    private CartItem getFromCartForProduct(Long firstProductId) {
        Cart cart = getAsObjectwithToken("/cart", userToken, Cart.class);
        return cartItemByProductId(firstProductId, cart);
    }

    private Cart assertItemsInCartWithAddToCartFor(Long productId, int totalCartItems) {
        return assertItemsInCartWithAddToCartFor(productId, totalCartItems, DEFAULT_QUANTITY);
    }

    private Cart assertItemsInCartWithAddToCartFor(Long productId, int totalCartItems, int quantity) {
        CartItemRequest firstCartItemRequest = new CartItemRequest(productId, quantity);
        Cart cart = postEntityWithToken("/cart", userToken, Cart.class, firstCartItemRequest);
        assertNotNull(cart);

        List<CartItem> cartItems = convertSetToList(cart.getCartItems());
        CartItem addedCartItem = cartItemByProductId(productId, cart);

        assertNotNull(addedCartItem);

        assertThat(quantity, equalTo(addedCartItem.getQuantity()));
        assertThat(cartItems.size(), equalTo(totalCartItems));

        return cart;
    }

    private Cart assertItemsInCartWithUpdateToCartRequest(Long productId, int totalCartItems, int quantity) {
        CartItemRequest cartItemRequest = new CartItemRequest(productId, quantity);
        Cart cart = putWithToken("/cart", userToken, Cart.class, cartItemRequest);
        assertNotNull(cart);

        List<CartItem> cartItems = convertSetToList(cart.getCartItems());
        CartItem addedCartItem = cartItemByProductId(productId, cart);

        assertNotNull(addedCartItem);

        assertThat(quantity, equalTo(addedCartItem.getQuantity()));
        assertThat(cartItems.size(), equalTo(totalCartItems));

        return cart;
    }

    private CartItem cartItemByProductId(Long productId, Cart cart) {


        return cart.getCartItems()
                .stream()
                .filter(cartItem -> cartItem.getProduct().getProductId() == productId)
                .findFirst()
                .orElse(null);
    }


}
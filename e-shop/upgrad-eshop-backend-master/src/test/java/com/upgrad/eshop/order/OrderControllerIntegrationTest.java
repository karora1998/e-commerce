package com.upgrad.eshop.order;

import com.upgrad.eshop.order.cart.Cart;
import com.upgrad.eshop.order.cart.item.CartItem;
import com.upgrad.eshop.product.Product;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import testutils.IntegrationTestRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class OrderControllerIntegrationTest extends IntegrationTestRunner {

    private static final Logger log = LoggerFactory.getLogger(OrderControllerIntegrationTest.class);


    @Test
     void placeOrderShouldCreateAnOrder()  {
//        Address address = new Address();
//
//        address.setName("Muthu");
//        address.setAddressLine1("EB Colony");
//        address.setAddressLine2("Chennai");
//        address.setZipCode("600088");
//        address.setMobileNumber("+919538xxxxx3");
//
//        Product prod = new Product();
//        prod.setName("Macook Pro");
//        prod.setPrice(1000000);
//
//        CartItem ci = CartItem.createCartItemRequestWith(prod, 1);
//        List<CartItem> cartItems = new ArrayList<>();
//        cartItems.add(ci);
//        Cart cart = Cart.createCartRequestWith(cartItems);
//        String adminToken = getAdminToken();
//
//        log.info("admin token" + adminToken);
//        Order createdOrder = postEntityWithToken("/orders/placeorder", adminToken, Order.class, createOrderRequestWith(address, cart));
//        log.info(createdOrder.toString());
//        assertNotNull(createdOrder);
//        assertThat(createdOrder.getAmount(), equalTo(cart.calculateCartTotalAmount()));
//        String orderId = createdOrder.getId();
//       Order orderFromGet = getAsObjectwithToken("/orders/"+ orderId ,adminToken, Order.class, orderId );
//       assertThat(orderFromGet.getId(), equalTo(createdOrder.getId()));
    }



}


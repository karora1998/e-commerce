package com.upgrad.eshop.order;

import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.notification.EmailNotificationService;
import com.upgrad.eshop.order.cart.Cart;
import com.upgrad.eshop.order.cart.CartController;
import com.upgrad.eshop.order.cart.item.CartItemRequest;
import com.upgrad.eshop.order.models.ApplyCouponRequest;
import com.upgrad.eshop.order.models.OrderRequest;
import com.upgrad.eshop.order.models.OrderStatus;
import com.upgrad.eshop.payment.PaymentController;
import com.upgrad.eshop.payment.config.UpgradPaymentValidator;
import com.upgrad.eshop.payment.models.InitiatePaymentResponse;
import com.upgrad.eshop.payment.models.PaymentRequest;
import com.upgrad.eshop.payment.models.RazorPayCompleteRequest;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductController;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;


import com.upgrad.eshop.users.address.ShippingAddress;
import com.upgrad.eshop.users.address.ShippingAddressService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.PostConstruct;
import javax.mail.internet.MimeMessage;

import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
public class OrderFlowFeatureTest {

    @Autowired
    MockDataGenerator mockDataGenerator;

    @Autowired
    UserService userService;

    @Autowired
    OrderController orderController;

    @Autowired
    PaymentController paymentController;


    @Autowired
    ProductService productService;

    @Autowired
    CartController cartController;

   @Autowired
   ShippingAddressService shippingAddressService;

   @MockBean
   UpgradPaymentValidator upgradPaymentValidator;


   @SpyBean
   JavaMailSender javaMailSender;

    public static final String TEST_USER_ORDER_FLOW = "test-user-order-flow";

    ShippingAddress shippingAddress;
    User testUser;

    @PostConstruct
    public void insertMockUsers() {

        try {


            testUser=userService.addUser(createRegisterRequestWith(TEST_USER_ORDER_FLOW, "password"));

        } catch (Throwable ignore) {

        }

        try {


            shippingAddress =shippingAddressService.addAddress(testUser, mockDataGenerator.getShippingAddressRequestForName(TEST_USER_ORDER_FLOW));

        } catch (Throwable ignore) {

        }
    }

    private static final Logger log = LoggerFactory.getLogger(OrderFlowFeatureTest.class);

    @Test
    @WithUserDetails(value = TEST_USER_ORDER_FLOW)
    public void addItemsinCartAndCreateOrderAndInitiatePaymentAndPaymentSuccess(){

        //Add Items to cart

        Double amountForProduct=1000D;

        Product productX = mockDataGenerator.getRandomProductWithAmount(amountForProduct);
        Product productY = mockDataGenerator.getRandomProductWithAmount(amountForProduct);

        int quantity = 1;

        Integer expectedAvailableItemsForX = productX.getAvailableItems() -quantity;
        Integer expectedAvailableItemsForY = productY.getAvailableItems() -quantity;

        cartController.addToCart(new CartItemRequest(productX.getProductId(), quantity));


        Cart updatedCart = cartController.addToCart(new CartItemRequest(productY.getProductId(), quantity));

        assertNotNull(updatedCart);
        assertThat(updatedCart.getCartItems().size(),equalTo(2));


       Order order= orderController.createOrder(new OrderRequest(shippingAddress.getId()));

        assertNotNull(order);
        assertThat(order.getCart().getCartItems().size(),equalTo(2));

        log.info(order.toString());

        //Apply Coupon on Order worth 200
        long couponAmount = 200L;
        Coupon coupon= mockDataGenerator.createCouponForAmount(couponAmount);
        ApplyCouponRequest applyCouponRequest= new ApplyCouponRequest(order.getId(),coupon.getCouponCode());
        Order updatedOrder = orderController.applyCoupon(applyCouponRequest);

        assertNotNull(updatedOrder);
        assertThat(updatedOrder.getCart().getCartItems().size(),equalTo(2));
        Double expectedFinalAmount = (amountForProduct * 2) -couponAmount;
        assertThat(updatedOrder.getFinalAmount(),equalTo(expectedFinalAmount));

        Long orderId = updatedOrder.getId();



        //Initiate Payment
        PaymentRequest paymentRequest = new PaymentRequest();

        paymentRequest.setOrderId(orderId);

        InitiatePaymentResponse initiatePaymentResponse= paymentController.initiatePayment(paymentRequest);

        assertNotNull(initiatePaymentResponse);
        assertNotNull(initiatePaymentResponse.getRazorpayOrderId());
        log.info(initiatePaymentResponse.toString());
        assertThat(initiatePaymentResponse.getAmount(),equalTo(expectedFinalAmount.longValue()));
        assertThat(initiatePaymentResponse.getUsername(),equalTo(testUser.getFirstName()));
        assertThat(initiatePaymentResponse.getUseremail(),equalTo(testUser.getEmail()));
        assertThat(initiatePaymentResponse.getOrderId(),equalTo(orderId));

        assertOrderStatus(orderId, OrderStatus.WAITING_FOR_PAYMENT);

        //Call Success Payment


        RazorPayCompleteRequest razorPayCompleteRequest = new RazorPayCompleteRequest();
        razorPayCompleteRequest.setRazorpay_order_id(initiatePaymentResponse.getRazorpayOrderId());
        razorPayCompleteRequest.setRazorpay_payment_id("some-xxx");
        razorPayCompleteRequest.setRazorpay_signature("some-yyyy");

        Mockito.doNothing().when(javaMailSender).send(ArgumentMatchers.any(MimeMessage.class));
        paymentController.onPaymentComplete(razorPayCompleteRequest);

        Mockito.verify(upgradPaymentValidator).validateSignature(ArgumentMatchers.any());
        Mockito.verify(javaMailSender).send(ArgumentMatchers.any(MimeMessage.class));




        //Get the Order and verify status

        assertOrderStatus(orderId, OrderStatus.PAYMENT_COMPLETED);
        //Get the Product and check the status

        Product updatedProductX = productService.getProductById(productX.getProductId()).get();
        Product updatedProductY = productService.getProductById(productY.getProductId()).get();



        assertThat(updatedProductX.getAvailableItems(),equalTo(expectedAvailableItemsForX));
        assertThat(updatedProductY.getAvailableItems(),equalTo(expectedAvailableItemsForY));

    }

    private void assertOrderStatus(Long orderId, OrderStatus orderStatus) {
        Order completedOrder = orderController.getOrderById(orderId);
        assertNotNull(completedOrder);
        assertThat(completedOrder.getStatus(),equalTo(orderStatus));
    }
}

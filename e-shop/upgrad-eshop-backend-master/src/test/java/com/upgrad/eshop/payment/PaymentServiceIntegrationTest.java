package com.upgrad.eshop.payment;
import com.razorpay.RazorpayException;
import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.order.Order;
import com.upgrad.eshop.order.OrderService;
import com.upgrad.eshop.payment.models.InitiatePaymentResponse;
import com.upgrad.eshop.payment.models.PaymentRequest;
import com.upgrad.eshop.product.Product;
import com.upgrad.eshop.product.ProductService;
import com.upgrad.eshop.product.search.SearchRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import com.upgrad.eshop.users.roles.RoleService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class PaymentServiceIntegrationTest {

    @Autowired
    PaymentService paymentService;


    @Autowired
    UserLoggedInService userLoggedInService;


    @MockBean
    OrderService orderService;

    @Test
    @WithUserDetails(value = "user")
    public void whenInitiatePaymentCalledExpectResponse() throws RazorpayException {

        PaymentRequest paymentRequest =new PaymentRequest();

        Double amount = 500D;

        paymentRequest.setOrderId(27387L);
        User user = userLoggedInService.getLoggedInUser();

        Order order = new Order();
        order.setFinalAmount(amount);
        order.setAmount(amount);

        when(orderService.findByUserAndId(ArgumentMatchers.any(),ArgumentMatchers.any())).thenReturn(order);
      InitiatePaymentResponse initiatePaymentResponse= paymentService.initiatePayment(user,paymentRequest);
        assertNotNull(initiatePaymentResponse);
      assertThat(initiatePaymentResponse.getAmount(),equalTo(amount.longValue()));
      assertThat(initiatePaymentResponse.getUseremail(),equalTo(user.getEmail()));
      assertThat(initiatePaymentResponse.getUsername(),equalTo(user.getFirstName()));
      assertNotNull(initiatePaymentResponse.getRazorpayOrderId());
    }
}
package com.upgrad.eshop.order;

import com.upgrad.eshop.coupon.Coupon;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.users.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.HashSet;
import java.util.Set;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
public class OrderServiceTest {


    @Test
    public void applying_50_as_coupon_for_500_worth_order_should_return_450_on_calling_calculateFinalAmountAfterApplyingCoupon(){
        OrderService orderService = new OrderService();
        Order order =new Order();
        Double amount = 500D;
        order.setFinalAmount(amount);
        order.setAmount(amount);

        Coupon coupon = createCouponFor(50);


      Double finalAmount= orderService.calculateFinalAmountAfterApplyingCoupon(order,coupon);
        assertThat(finalAmount,equalTo(450D));
    }

    @Test
    public void applying_550_as_coupon_for_500_worth_order_should_throw_exception_on_calling_calculateFinalAmountAfterApplyingCoupon(){
        OrderService orderService = new OrderService();
        Order order =new Order();
        Double amount = 500D;
        order.setFinalAmount(amount);
        order.setAmount(amount);

        Coupon coupon = createCouponFor(550);


      assertThrows(AppException.class,()->{
          orderService.calculateFinalAmountAfterApplyingCoupon(order,coupon);
      });

    }

    @Test
    public void given_multiple_coupons_in_order_when_getCouponValue_is_called_expect_total_to_be_sum_of_coupons(){
        OrderService orderService = new OrderService();
        Order order =new Order();


        Set<Coupon> couponSet = new HashSet<>();
        couponSet.add(createCouponFor(50));
        couponSet.add(createCouponFor(100));
        couponSet.add(createCouponFor(150));
        order.setCoupons(couponSet);


      Long finalAmount= orderService.getCouponValue(order);

      assertThat(finalAmount,equalTo(300L));


    }
    @Test
    public void given_no_coupons_in_order_when_getCouponValue_is_called_expect_total_to_be_zero(){
        OrderService orderService = new OrderService();
        Order order =new Order();

      Long finalAmount= orderService.getCouponValue(order);

      assertThat(finalAmount,equalTo(0L));


    }

    private Coupon createCouponFor(long amount) {
        Coupon coupon = new Coupon();
        coupon.setAmount(amount);
        return coupon;
    }

}
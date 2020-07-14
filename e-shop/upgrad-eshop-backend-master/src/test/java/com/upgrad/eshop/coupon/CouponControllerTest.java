package com.upgrad.eshop.coupon;

import com.upgrad.eshop.exception.UpgradResponseStatusException;
import com.upgrad.eshop.order.OrderRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@RunWith(MockitoJUnitRunner.class)
public class CouponControllerTest {

    @InjectMocks
    CouponController couponController;


    @Mock
    private CouponService couponService;

    @After
    public void reset_mocks() {
        Mockito.reset(couponService);
    }
    @Test
    public void Given_couponService_getActiveByCouponCode_returns_data_when_getActiveCouponByCodeCalled_Expect_Service_method_has_beenInvoked(){


        Optional<Coupon> coupon = Optional.of(new Coupon());
        String sampleCouponCode = "xxxxy";
        when(couponService.getActiveByCouponCode(sampleCouponCode)).thenReturn(coupon);

         couponController.getActiveCouponByCode(sampleCouponCode);

        verify(couponService).getActiveByCouponCode(sampleCouponCode);

    }


    @Test(expected = UpgradResponseStatusException.class)
    public void Given_couponService_getActiveByCouponCode_returns_empty_when_getActiveCouponByCodeCalled_Expect_Controller_throwsException(){


        Optional<Coupon> coupon = Optional.empty();
        when(couponService.getActiveByCouponCode("xxxx")).thenReturn(coupon);

         couponController.getActiveCouponByCode("xxxx");



    }

}
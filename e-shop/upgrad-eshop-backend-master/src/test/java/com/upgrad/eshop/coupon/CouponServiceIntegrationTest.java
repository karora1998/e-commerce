package com.upgrad.eshop.coupon;
import com.upgrad.eshop.coupon.models.CouponRequest;
import com.upgrad.eshop.coupon.models.CouponStatus;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.utils.PaginationRequest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
class CouponServiceIntegrationTest {

    @Autowired
    CouponService couponService;

    @Autowired
    MockDataGenerator mockDataGenerator;

    private static final Logger log = LoggerFactory.getLogger(CouponServiceIntegrationTest.class);

    @Test
    public void creatingNewCouponWithAmountShouldCreateCoupon(){
        long amount = 600L;
       Coupon coupon= createCouponForAmount(amount);
        assertNotNull(coupon);
        assertNotNull(coupon.getCouponCode());
        log.info(coupon.toString());

        assertThat(coupon.getAmount(),equalTo(amount));
        assertThat(coupon.getStatus(),equalTo(CouponStatus.ACTIVE));

    }

    @Test
    public void CallingGetCouponsWhenNoCouponsShouldReturnEmpty(){
        couponService.deleteAllCoupons();
       Page<Coupon> couponPage= couponService.getCoupons(new PaginationRequest());

       assertNotNull(couponPage);
       assertThat(couponPage.getContent().size(),equalTo(0));

    }

    @Test
    public void CallingGetCouponsWhenThereAreTwoCouponsShouldReturnTwoCoupons(){
        createCouponForAmount(560L);
        createCouponForAmount(650L);
       Page<Coupon> couponPage= couponService.getCoupons(new PaginationRequest());

       assertNotNull(couponPage);
       assertThat(couponPage.getContent().size(),greaterThanOrEqualTo(2));

    }

    @Test
    public void CallingMarkCouponAsAppliedShouldChangeTheStatusOfCouponToApplied(){
       Coupon createdOne = createCouponForAmount(560L);
        assertNotNull(createdOne);
        assertNotNull(createdOne.getCouponCode());
        assertThat(createdOne.getStatus(),equalTo(CouponStatus.ACTIVE));
        Coupon updatedCoupon = couponService.markCouponAsApplied(createdOne.getCouponCode());


       assertNotNull(updatedCoupon);
       assertThat(createdOne.getId(),equalTo(updatedCoupon.getId()));
       assertThat(updatedCoupon.getStatus(),equalTo(CouponStatus.APPLIED));

    }

    @Test
    public void CallingMarkCouponAsAppliedForInvalidCouponNumberShouldThrowException(){


        assertThrows(AppException.class,()->{
            couponService.markCouponAsApplied("-2");

        });



    }

    Coupon createCouponForAmount(long amount) {
        return mockDataGenerator.createCouponForAmount(amount);

    }


}
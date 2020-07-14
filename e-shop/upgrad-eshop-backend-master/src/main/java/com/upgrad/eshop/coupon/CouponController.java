package com.upgrad.eshop.coupon;

import com.upgrad.eshop.coupon.models.CouponRequest;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.exception.UpgradResponseStatusException;
import com.upgrad.eshop.utils.PaginationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;

@RestController
@RequestMapping("/coupons")
public class CouponController {


    private CouponService couponService;


    private static final Logger logger = LoggerFactory.getLogger(CouponController.class);

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public Page<Coupon> getCoupons(PaginationRequest paginationRequest) {
        return couponService.getCoupons(paginationRequest);
    }

    @GetMapping("/active/{couponcode}")
    public Coupon getActiveCouponByCode(@PathVariable String couponcode) {
        return couponService
                .getActiveByCouponCode(couponcode)
                .orElseThrow(() -> asBadRequest("Invalid Coupon Code"));
    }




    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public Coupon addCoupon(@RequestBody CouponRequest coupon) {
        try {
            return couponService.addCoupon(coupon);

        } catch (ConstraintViolationException e) {
            e.printStackTrace();
            throw asConstraintViolation(e);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }


    @DeleteMapping("/{couponId}")
    @PreAuthorize("hasAnyRole('ADMIN','INVENTORY_MANAGER')")
    public void removeCoupon(@PathVariable Long couponId) {
        try {
            couponService.removeCoupon(couponId);
        } catch (Exception e) {
            throw asBadRequest(e.getMessage());
        }
    }


}

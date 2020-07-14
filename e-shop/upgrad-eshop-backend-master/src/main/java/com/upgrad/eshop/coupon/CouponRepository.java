package com.upgrad.eshop.coupon;

import java.util.Date;
import java.util.Optional;

import com.upgrad.eshop.coupon.models.CouponStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CouponRepository extends JpaRepository<Coupon,Long> {
	
	 public Optional<Coupon> findOneByCouponCode(String couponCode);
	 public Optional<Coupon> findOneByCouponCodeAndStatus(String couponCode,CouponStatus couponStatus);
	 public Page<Coupon> findAllByStatus(CouponStatus couponStatus, Pageable pageable);
	 public Page<Coupon> findAll( Pageable pageable);
}

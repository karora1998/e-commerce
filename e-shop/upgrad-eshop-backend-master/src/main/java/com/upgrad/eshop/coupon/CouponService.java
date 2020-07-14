package com.upgrad.eshop.coupon;

import java.util.Optional;

import com.upgrad.eshop.coupon.models.CouponRequest;
import com.upgrad.eshop.coupon.models.CouponStatus;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.utils.PaginationRequest;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.annotation.Validated;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Service
@Validated
public class CouponService {


	private CouponRepository couponRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(CouponService.class);

	@Value("${coupon.size}")
	public   int COUPON_LENGTH = 30;



	@Autowired
	public CouponService(CouponRepository couponRepository) {
		this.couponRepository = couponRepository;
	}


	public Page<Coupon> getCoupons(PaginationRequest paginationRequest) {


       return couponRepository.findAll(paginationRequest.asPageable());

	}
	
	public Coupon addCoupon(@Valid  CouponRequest couponRequest) {
		Coupon coupon = new Coupon();
		coupon.setAmount(couponRequest.getAmount());
		coupon.setStatus(CouponStatus.ACTIVE);
		coupon.setName(couponRequest.getName());
		coupon.setCouponCode(generateCoupon());

		return saveCoupon(coupon);
	}




	private String generateCoupon(){

		String code = getRandomCode();

		if(isCouponCodeAlreadyExists(code))
			return generateCoupon();
		else
			return code;


	}

	private boolean isCouponCodeAlreadyExists(String code) {
		return getOneByCouponCode(code).isPresent();
	}

	public Optional<Coupon> getOneByCouponCode(String code) {
		return couponRepository.findOneByCouponCode(code);
	}
	public Optional<Coupon> getActiveByCouponCode(String code) {
		return couponRepository.findOneByCouponCodeAndStatus(code,CouponStatus.ACTIVE);
	}

	private String getRandomCode() {
		return RandomStringUtils.random(COUPON_LENGTH, true, true);
	}


	public void removeCoupon(Long couponId) {
		couponRepository.deleteById(couponId);
	}

	public Coupon markCouponAsApplied(String couponCode) {
		return getOneByCouponCode(couponCode).
				map(coupon -> markCouponAsApplied(coupon))
				.orElseThrow(()-> new AppException("Invalid Coupon Id"));

	}

	public Coupon markCouponAsApplied(Coupon coupon) {
		coupon.setStatus(CouponStatus.APPLIED);
		return saveCoupon(coupon);
	}

	@Transactional
	Coupon saveCoupon(Coupon coupon) {
		return couponRepository.save(coupon);
	}



	public Page<Coupon> getActiveCoupons(PaginationRequest paginationRequest) {
		return couponRepository.findAllByStatus(CouponStatus.ACTIVE,paginationRequest.asPageable());
	}

	@Transactional
    public void deleteAllCoupons() {
		couponRepository.deleteAll();
    }
}

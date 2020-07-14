package com.upgrad.eshop.payment;

import com.upgrad.eshop.order.Order;
import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, Long> {

    Optional<Payment> findById(Long id);
    Optional<Payment> findOneByRazorpayOrderId(String id);

    Optional<Payment> findOneByOrderId(Long orderId);




}
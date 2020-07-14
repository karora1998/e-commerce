package com.upgrad.eshop.order.cart;

import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    Optional<Cart> findOneByUserAndStatus(User user, CartStatus status);

    Page<Cart> findAll(Pageable pageable);




    void deleteByUserAndStatus(User user, CartStatus status);

    Optional<Cart> findByUserAndId(User user,String id);


}
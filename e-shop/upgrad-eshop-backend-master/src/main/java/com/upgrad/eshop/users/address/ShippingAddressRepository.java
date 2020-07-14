package com.upgrad.eshop.users.address;

import com.upgrad.eshop.users.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {

    List<ShippingAddress> findAll();
    List<ShippingAddress> findAllByUser(User user);
    Optional<ShippingAddress> findByUserAndId(User user, Long id);
   void deleteByUserAndId(User user, Long id);




}

package com.upgrad.eshop.order;

import com.upgrad.eshop.order.models.OrderStatus;
import com.upgrad.eshop.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findAllByUserOrderByOrderDateDesc(User user);

    Page<Order> findAllByUser(User user,Pageable pageable);

    Page<Order> findAll(Pageable pageable);

    void deleteById(Long id);

    Optional<Order> findById(Long id);

    Optional<Order> findByUserAndId(User user,Long id);


//    @Query(
//            value = "SELECT * FROM USERS u WHERE u.status = 1",
//            nativeQuery = true)
//    Collection<Order> findAllActiveUsersNative();
    Optional<Order> findByUserAndStatusIn(User user, Set<OrderStatus> orderStatus);


}
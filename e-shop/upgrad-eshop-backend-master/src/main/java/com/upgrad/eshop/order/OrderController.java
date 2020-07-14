package com.upgrad.eshop.order;


import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.exception.AppException;
import com.upgrad.eshop.order.models.ApplyCouponRequest;
import com.upgrad.eshop.order.models.OrderRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.utils.PaginationRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import java.util.List;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;

@RestController
@RequestMapping("/orders")
public class OrderController {


    private OrderService orderService;
    private UserLoggedInService userLoggedInService;


    public OrderController(OrderService orderService, UserLoggedInService userLoggedInService) {
        this.orderService = orderService;
        this.userLoggedInService = userLoggedInService;
    }


    @GetMapping("/active")
    public Order getActiveOrder() {

        try {

            User user = userLoggedInService.getLoggedInUser();
            Order activeOrderByUser = orderService.findActiveOrderByUser(user);
            if(null != activeOrderByUser)
                    return activeOrderByUser;
            else
                throw new AppException("No Active Order");

        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {

        try {

            User user = userLoggedInService.getLoggedInUser();
            return orderService.findByUserAndId(user, id);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @GetMapping
    public List<Order> findAllByUser() {

        try {

            User user = userLoggedInService.getLoggedInUser();
            return orderService.findAllByUser(user);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {

        try {

            User user = userLoggedInService.getLoggedInUser();
             orderService.cancelOrderByUserAndId(user, id);
             return ResponseEntity.ok("Successfully Cancelled Order");
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @PostMapping
    public Order createOrder(@RequestBody OrderRequest orderRequest) {

        try {

            User user = userLoggedInService.getLoggedInUser();
            return orderService.createOrder(user, orderRequest);

        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }

    }

    @PutMapping(value = "/applycoupon")
    public Order applyCoupon(@RequestBody ApplyCouponRequest couponRequest) {

        try {

            User user = userLoggedInService.getLoggedInUser();
            return orderService.applyCoupon(user, couponRequest);

        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }

    }


}

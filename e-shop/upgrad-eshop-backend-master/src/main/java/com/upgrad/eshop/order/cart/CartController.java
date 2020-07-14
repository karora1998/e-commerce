package com.upgrad.eshop.order.cart;


import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.order.cart.item.CartItemRequest;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;
import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;

@RestController
@RequestMapping("/cart")
public class CartController {


    public CartController(CartService cartService, UserLoggedInService userLoggedInService) {
        this.cartService = cartService;
        this.userLoggedInService = userLoggedInService;
    }

    private CartService cartService;
    private UserLoggedInService userLoggedInService;


    @PostMapping
    public Cart addToCart(@RequestBody  CartItemRequest cartItemRequest) {

        User user = userLoggedInService.getLoggedInUser();

        try {
            return cartService.addToCart(user, cartItemRequest);
        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }

    }

    @GetMapping
    public Cart getCart() {

        User user = userLoggedInService.getLoggedInUser();
        return cartService.getCart(user);


    }

    @PutMapping
    public Cart updateCart(@RequestBody CartItemRequest cartItemRequest) {

        User user = userLoggedInService.getLoggedInUser();

        try {

            return cartService.updateCartItem(user, cartItemRequest);
        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }

    }


    @DeleteMapping("/{productid}")
    public Cart deleteFromCart(@PathVariable Long productid) {

        User user = userLoggedInService.getLoggedInUser();

        try {

            return cartService.deleteFromCart(user, productid);
        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }

    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllFromCart() {

        User user = userLoggedInService.getLoggedInUser();

        cartService.deleteAllForUser(user);
        return ResponseEntity.ok("Successfully Deleted");

    }


}

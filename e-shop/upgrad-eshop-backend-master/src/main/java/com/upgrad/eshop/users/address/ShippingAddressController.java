package com.upgrad.eshop.users.address;


import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.exception.UpgradResponseStatusException;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asConstraintViolation;


@RestController
@RequestMapping("/user-addresses")
public class ShippingAddressController {


    private UserLoggedInService userLoggedInService;
    private ShippingAddressService shippingAddressService;


    private static final Logger log = LoggerFactory.getLogger(ShippingAddressController.class);

    @Autowired
    public ShippingAddressController( UserLoggedInService userLoggedInService, ShippingAddressService shippingAddressService) {

        this.userLoggedInService = userLoggedInService;
        this.shippingAddressService = shippingAddressService;
    }


    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping
    public List<ShippingAddress> findAllByUser() {


        User user = userLoggedInService.getLoggedInUser();
        return shippingAddressService.findAllByUser(user);


    }

    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/{id}")
    public ShippingAddress findByUserAndId(@PathVariable Long id) {


        try {

            User user = userLoggedInService.getLoggedInUser();
            return shippingAddressService.findByUserAndId(user,id);

        }catch (AppException e){
          throw   UpgradResponseStatusException.asBadRequest(e.getMessage());
        }


    }


    @PreAuthorize("hasAnyRole('USER')")
    @PostMapping
    public ShippingAddress addAddress(@RequestBody ShippingAddressRequest shippingAddressRequest) {


        try {

            User user = userLoggedInService.getLoggedInUser();
            return shippingAddressService.addAddress(user, shippingAddressRequest);


        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }


    }

    @PreAuthorize("hasAnyRole('USER')")
    @PutMapping("/{id}")
    public ShippingAddress updateAddress(@PathVariable Long id, @RequestBody ShippingAddressRequest shippingAddressRequest) {


        try {

            User user = userLoggedInService.getLoggedInUser();
            return shippingAddressService.updateAddress(id, user, shippingAddressRequest);


        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }


    }

    @PreAuthorize("hasAnyRole('USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {

        User user = userLoggedInService.getLoggedInUser();
        shippingAddressService.deleteAddress(user, id);


        return ResponseEntity.ok("Succesfully Deleted Address");
    }


}

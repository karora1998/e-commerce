package com.upgrad.eshop.users;


import com.upgrad.eshop.config.security.UserLoggedInService;
import com.upgrad.eshop.users.credentials.ChangePasswordRequest;
import com.upgrad.eshop.users.credentials.ChangePasswordService;
import com.upgrad.eshop.users.models.UpdateUserDetailRequest;
import com.upgrad.eshop.exception.ForbiddenException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    UserLoggedInService userLoggedInService;


    @Autowired
    ChangePasswordService changePasswordService;


    private static final Logger log = LoggerFactory.getLogger(UserController.class);


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> listUsers() {

        return userService.findAll();
    }


    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @GetMapping(value = "/details")
    public User getMyDetails() {

        return userLoggedInService.getLoggedInUser();
    }


    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @PutMapping(value = "/changepassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {


        try {
            log.info("No errors to change based on" + changePasswordRequest.getPassword());

            User user = userLoggedInService.getLoggedInUser();
            changePasswordService.changePassword(user, changePasswordRequest);
            return ResponseEntity.ok("Succesfully Changed");

        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }catch (ForbiddenException e) {
            throw asForbidden(e.getMessage());
        }


    }

    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @DeleteMapping(value = "/closeaccount")
    public ResponseEntity<?> closeAccount() {

        User user = userLoggedInService.getLoggedInUser();
        userService.delete(user.getUserName());


        return ResponseEntity.ok("Succesfully Closed Account");
    }


    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping(value = "/deleteuser/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {




        userService.delete(username);


        return ResponseEntity.ok("Succesfully removed User");
    }





    @PreAuthorize("hasAnyRole('USER','ADMIN','INVENTORY_MANAGER')")
    @PutMapping
    public User updateUserDetails(@RequestBody  UpdateUserDetailRequest updateUserDetailRequest) {
        try {
            User user = userLoggedInService.getLoggedInUser();
            return userService.updateUserDetails(user,updateUserDetailRequest);
        } catch (ConstraintViolationException e) {
            throw asConstraintViolation(e);
        }


    }


}

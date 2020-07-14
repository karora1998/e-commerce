package com.upgrad.eshop.config.security;

import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


@Component
public class UserLoggedInService {

    private static final Logger log = LoggerFactory.getLogger(UserLoggedInService.class);


    private UserService userService;

    @Autowired
    public UserLoggedInService(UserService userService) {
        this.userService = userService;
    }


    public User getLoggedInUser() {

        try {

            UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();



            return userService.findByUserName(principal.getUsername());
        } catch (Exception t) {

            return null;
        }
    }


}

package com.upgrad.eshop.auth;

import com.upgrad.eshop.auth.models.LoginRequest;
import com.upgrad.eshop.auth.models.LoginResponse;
import com.upgrad.eshop.auth.models.RegisterRequest;
import com.upgrad.eshop.config.security.TokenProvider;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.UserService;
import com.upgrad.eshop.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asBadRequest;


@RestController
@RequestMapping("/auth")
public class AuthController {


    private AuthenticationManager authenticationManager;


    private TokenProvider tokenProvider;


    private UserService userService;


    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenProvider tokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws AuthenticationException {

        try {


            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    )
            );


            SecurityContextHolder.getContext().setAuthentication(authentication);
            final String token = tokenProvider.generateToken(authentication);
            LoginResponse result = new LoginResponse(loginRequest.getUserName(), "Success", token);

            return ResponseEntity.ok(result);


        } catch (AuthenticationException e) {
            e.printStackTrace();
            log.info("AuthenticationException" + e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Bad credentials", e);
        }

    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public User saveUser(@RequestBody RegisterRequest user) {

        try {

            return userService.addUser(user);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }


    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/admin/register", method = RequestMethod.POST)
    public User saveAdmin(@RequestBody RegisterRequest user) {

        try {
            return userService.addAdmin(user);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/manager/register", method = RequestMethod.POST)
    public User saveInventoryManager(@RequestBody RegisterRequest user) {

        try {
            return userService.addInventoryManager(user);
        } catch (AppException e) {
            throw asBadRequest(e.getMessage());
        }
    }
}

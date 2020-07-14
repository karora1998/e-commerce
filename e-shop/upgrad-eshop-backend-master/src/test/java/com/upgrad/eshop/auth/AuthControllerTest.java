package com.upgrad.eshop.auth;

import com.upgrad.eshop.auth.models.RegisterRequest;

import static com.upgrad.eshop.exception.UpgradResponseStatusException.asExceptionFromHttpStatus;
import static org.hamcrest.MatcherAssert.assertThat;

import com.upgrad.eshop.users.UserService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.hamcrest.Matchers.*;

@RunWith(MockitoJUnitRunner.class)
public class AuthControllerTest {


    @InjectMocks
    AuthController authController;

    @Mock
    UserService userService;


    @Test
    public void WhenSavingInventoryManagerThrowsUnableToSaveExceptionTheControllerShouldThrowResponseStatusException(){

        Mockito.when(userService.addInventoryManager(any())).thenThrow(asExceptionFromHttpStatus("Username Already Exists", HttpStatus.FORBIDDEN));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,()->{
                authController.saveInventoryManager(RegisterRequest.createRegisterRequestWith("inventory","inventory"));
        });

        assertThat(exception.getMessage(),containsString("Already Exists"));


    }

    @Test
    public void WhenSavingAdminThrowsUnableToSaveExceptionTheControllerShouldThrowResponseStatusException(){

        Mockito.when(userService.addAdmin(any())).thenThrow(asExceptionFromHttpStatus("Username Already Exists",HttpStatus.FORBIDDEN));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,()->{
                authController.saveAdmin(RegisterRequest.createRegisterRequestWith("admin","admin"));
        });

        assertThat(exception.getMessage(),containsString("Already Exists"));


    }
}
package com.upgrad.eshop.auth;


import com.upgrad.eshop.auth.models.LoginResponse;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.users.User;
import com.upgrad.eshop.users.roles.Role;
import com.upgrad.eshop.users.roles.UserRole;

//All integration tests will use Jupiter API
import org.junit.jupiter.api.Test;
//Read more on https://sormuras.github.io/blog/2018-09-13-junit-4-core-vs-jupiter-api.html

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.upgrad.eshop.auth.models.LoginRequest.createLoginRequestWith;
import static org.hamcrest.MatcherAssert.assertThat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import testutils.IntegrationTestRunner;

import java.util.List;

import static org.hamcrest.Matchers.*;

import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static org.junit.jupiter.api.Assertions.*;
import static testutils.DataConverter.convertSetToList;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AuthControllerFeatureTest extends IntegrationTestRunner {


    @Autowired
    MockDataGenerator mockDataGenerator;

    private static final Logger log = LoggerFactory.getLogger(AuthControllerFeatureTest.class);
    @Test
    public void registeringWithNewCustomerShouldCreateUser() throws Exception {
        String testuser = "testuser";
        User registeredUser = postEntity("/auth/register", User.class,createRegisterRequestWith(testuser, "password"));
        log.info(registeredUser.toString());
        assertNotNull(registeredUser);
        assertThat(registeredUser.getUserName(),equalTo(testuser));
        List<Role> roles = convertSetToList(registeredUser.getRoles());
        assertThat(roles.size(),equalTo(1));
        assertThat(roles.get(0).getName(),equalTo(UserRole.USER.name()));

    }

    @Test
    public void registeringWithNewCustomerWithExistingUserShouldThrowException() throws Exception {
        String existingTestuser = "user";



     Throwable throwable=   assertThrows(RuntimeException.class, () -> {
            postEntity("/auth/register", User.class,createRegisterRequestWith(existingTestuser, "password"));
        });

     assertThat(throwable.getMessage(),containsString("Username already exists"));


    }
    @Test
    public void LoggingInWithValidCredentialsShouldRespondWithToken() throws Exception {
        String testuser = "user";
        String password = "password";
         LoginResponse loggedInResponse = postEntity("/auth/login",LoginResponse.class,createLoginRequestWith(testuser, password));
        String token = loggedInResponse.getToken();
        log.info(loggedInResponse.toString());
        assertNotNull(loggedInResponse);
        assertThat(token,notNullValue());


    }

    @Test
    public void LoggingInWithInValidCredentialsShouldThrowError() throws Exception {
        String testuser = "erroruser";
        String password = "password";
        RuntimeException thrown=  assertThrows(RuntimeException.class, () -> {
            postEntity("/auth/login",LoginResponse.class,createLoginRequestWith(testuser, password));
        });

       assertThat(thrown.getMessage(),containsString("Bad credentials"));

    }

    @Test
    public void registeringNewAdminUserShouldRegisterSuccesfully() throws Exception {

        String adminToken = mockDataGenerator.getAdminToken();

        log.info("admin token" + adminToken);
        String testAdminuser = "testadmin";
        User registeredUser = postEntityWithToken("/auth/admin/register",adminToken, User.class,createRegisterRequestWith(testAdminuser, "password"));

        log.info(registeredUser.toString());
        assertNotNull(registeredUser);
        assertThat(registeredUser.getUserName(),equalTo(testAdminuser));
        List<Role> roles = convertSetToList(registeredUser.getRoles());
        assertThat(roles.size(),equalTo(1));
        assertThat(roles.get(0).getName(),equalTo(UserRole.ADMIN.name()));
    }

    @Test
    public void registeringNewAdminUserWithInvalidTokenShouldThrowError() throws Exception {

        String adminToken = "787s87878";


        String testAdminuser = "testadmin";
        RuntimeException thrown=  assertThrows(RuntimeException.class, () -> {
            postEntityWithToken("/auth/admin/register",adminToken, User.class,createRegisterRequestWith(testAdminuser, "password"));
        });

        //assertThat(thrown.getMessage(),containsString("Unauthorized"));


    }

    @Test
    public void registeringNewAdminUserWithoutTokenShouldThrowError() throws Exception {


        String testAdminuser = "testadmin";
        RuntimeException thrown=  assertThrows(RuntimeException.class, () -> {
            postEntity("/auth/admin/register", User.class,createRegisterRequestWith(testAdminuser, "password"));
        });

        //assertThat(thrown.getMessage(),containsString("Unauthorized"));


    }



    @Test
    public void registeringNewInventoryManagerShouldRegisterSuccesfully() throws Exception {

        String adminToken = mockDataGenerator.getAdminToken();

        log.info("admin token" + adminToken);
        String testAdminuser = "testinventorymanager";
        User registeredUser = postEntityWithToken("/auth/manager/register",adminToken, User.class,createRegisterRequestWith(testAdminuser, "password"));

        log.info(registeredUser.toString());
        assertNotNull(registeredUser);
        assertThat(registeredUser.getUserName(),equalTo(testAdminuser));
        List<Role> roles = convertSetToList(registeredUser.getRoles());
        assertThat(roles.size(),equalTo(1));
        assertThat(roles.get(0).getName(),equalTo(UserRole.INVENTORY_MANAGER.name()));
    }


}
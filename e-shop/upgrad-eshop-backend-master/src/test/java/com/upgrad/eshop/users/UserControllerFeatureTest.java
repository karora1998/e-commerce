package com.upgrad.eshop.users;


import com.upgrad.eshop.auth.models.LoginResponse;
import com.upgrad.eshop.auth.models.RegisterRequest;
import com.upgrad.eshop.mocks.MockDataGenerator;
import com.upgrad.eshop.users.models.UpdateUserDetailRequest;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import testutils.IntegrationTestRunner;

import static com.upgrad.eshop.auth.models.LoginRequest.createLoginRequestWith;
import static com.upgrad.eshop.auth.models.RegisterRequest.createRegisterRequestWith;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerFeatureTest extends IntegrationTestRunner {

    private static final Logger log = LoggerFactory.getLogger(UserControllerFeatureTest.class);

    @Autowired
    MockDataGenerator mockDataGenerator;

    @Test
    public void VerifyUpdateUserDetailsAndCloseAccount() throws Exception {
        String testuser = "testuser-verify";
        String password = "password";

        String jon = "Jon";
        String snow = "Snow";

        User registeredUser = registerUser(testuser, password, jon, snow);

        assertNotNull(registeredUser);
        assertThat(registeredUser.getFirstName(),equalTo(jon));

        String token = mockDataGenerator.loginWith(testuser, password);
        assertNotNull(token);

        //Update User Details
        String aegon = "Aegon";
        String targereyan = "Targereyan";

        User updatedUser = updateUserDetails(token, aegon, targereyan);

        assertNotNull(updatedUser);
        assertThat(updatedUser.getFirstName(),equalTo(aegon));
        assertThat(updatedUser.getLastName(),equalTo(targereyan));

        //Close Account
      String response=      deleteWithToken("/users/closeaccount",token,String.class,null);
        assertThat(response,containsString("Succesfully Deleted"));
        //Login with that account Should throw Exception

        RuntimeException thrown=  assertThrows(RuntimeException.class, () -> {
            postEntity("/auth/login", LoginResponse.class,createLoginRequestWith(testuser, password));
        });

        assertThat(thrown.getMessage(),containsString("Bad credentials"));


    }

    private User updateUserDetails(String token, String aegon, String targereyan) {
        UpdateUserDetailRequest updateUserDetailRequest = new UpdateUserDetailRequest();
        updateUserDetailRequest.setFirstName(aegon);
        updateUserDetailRequest.setLastName(targereyan);
        return putWithToken("/users",token,User.class,updateUserDetailRequest);
    }

    private User registerUser(String testuser, String password, String jon, String snow) {
        RegisterRequest registerRequest = createRegisterRequestWith(testuser, password);
        registerRequest.setFirstName(jon);
        registerRequest.setLastName(snow);
        return postEntity("/auth/register", User.class, registerRequest);
    }


}
package com.upgrad.eshop.auth.models;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterRequest {

    @ApiModelProperty(example = "newuser")
    private String userName;

    @ApiModelProperty(example = "password")
    private String password;

    @ApiModelProperty(example = "MK")
    private String firstName;


    @ApiModelProperty(example = "newuser@upgrad.com")
    private String email="";

    @ApiModelProperty(example = "988989232")
    private String phoneNumber="";


    @ApiModelProperty(example = "Gandhi")
    private String lastName;


    public static RegisterRequest createRegisterRequestWith(String user, String password) {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUserName(user);
        registerRequest.setPassword(password);
        registerRequest.setFirstName(user);
        registerRequest.setLastName("");
        registerRequest.setPhoneNumber("9629150400");
        registerRequest.setEmail(user + "@upgrad.com");
        return registerRequest;
    }
}

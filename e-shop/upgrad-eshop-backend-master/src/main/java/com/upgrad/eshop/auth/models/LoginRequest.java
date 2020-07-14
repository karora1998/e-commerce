package com.upgrad.eshop.auth.models;

import io.swagger.annotations.ApiModelProperty;

public class LoginRequest {

    @ApiModelProperty(example = "user")
    private String userName;

    @ApiModelProperty(example = "password")
	private String password;

	public LoginRequest() {

	}


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public static LoginRequest createLoginRequestWith(String user, String password) {
		LoginRequest loginRequest = new LoginRequest();
		loginRequest.setUserName(user);
		loginRequest.setPassword(password);
		return loginRequest;
	}
}

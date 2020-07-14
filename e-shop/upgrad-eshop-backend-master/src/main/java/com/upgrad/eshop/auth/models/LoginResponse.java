package com.upgrad.eshop.auth.models;

public class LoginResponse {

    @Override
    public String toString() {
        return "LoginResponse{" +
                "userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                ", token='" + token + '\'' +
                '}';
    }

    private String userName;
    private String message;
    private String token;

    public LoginResponse(){

    }
    public LoginResponse(String userName, String message, String token) {
        super();
        this.userName = userName;
        this.message = message;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}

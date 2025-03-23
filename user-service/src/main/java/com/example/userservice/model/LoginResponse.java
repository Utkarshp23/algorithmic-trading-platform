package com.example.userservice.model;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private String message;
    private String jwtToken;
    private String userName;

    public LoginResponse(boolean success, String message, String jwtToken,String userName) {
        this.success = success;
        this.message = message;
        this.jwtToken = jwtToken;
        this.userName = userName;
    }
}

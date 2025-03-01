package com.example.userservice.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String clientId;
    private String mpin;

    public LoginRequest(String clientId, String mpin) {
        this.clientId = clientId;
        this.mpin = mpin;
    }

}

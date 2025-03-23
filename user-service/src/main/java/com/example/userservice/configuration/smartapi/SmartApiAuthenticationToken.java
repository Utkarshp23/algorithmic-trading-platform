package com.example.userservice.configuration.smartapi;

import com.angelbroking.smartapi.models.User;

import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class SmartApiAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private final User smartApiUser;

    public SmartApiAuthenticationToken(Object principal, Object credentials, User smartApiUser) {
        super(principal, credentials, Collections.<GrantedAuthority>emptyList()); // Use three-argument constructor
        this.smartApiUser = smartApiUser;
    }

    public User getSmartApiUser() {
        return smartApiUser;
    }
}
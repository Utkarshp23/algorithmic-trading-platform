package com.example.userservice.controller;

import com.angelbroking.smartapi.models.User;
import com.example.userservice.configuration.smartapi.SmartApiAuthenticationToken;
import com.example.userservice.model.LoginRequest;
import com.example.userservice.model.LoginResponse;
import com.example.userservice.service.UserService;
import com.example.userservice.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/hello")
    public String getMethodName() {
        return new String("Hello World");
    }
    

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {       
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getClientId(), loginRequest.getMpin())
            );

            // Cast the authentication principal to your custom token
            SmartApiAuthenticationToken smartApiAuthToken = (SmartApiAuthenticationToken) authentication;
            User smartApiUser = smartApiAuthToken.getSmartApiUser();

            // Generate JWT token
            String jwtToken = jwtUtil.generateToken(loginRequest.getClientId(), smartApiUser);

            return new LoginResponse(true, "Login successful", jwtToken);
        } catch (Exception e) {
            return new LoginResponse(false, "Invalid credentials: " + e.getMessage(), null);
        }

        // try {
        //     // Authenticate using Spring Security
        //     Authentication authentication = authenticationManager.authenticate(
        //             new UsernamePasswordAuthenticationToken(loginRequest.getClientId(), loginRequest.getMpin()));

        //     // Set the authentication object in the SecurityContext
        //     SecurityContextHolder.getContext().setAuthentication(authentication);
        //     return ResponseEntity.ok(new LoginResponse(true, "Login successful", authentication.getPrincipal()));

        // } catch (Exception e) {
        //     // Return error response
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        //             .body(new LoginResponse(false, "Login failed: " + e.getMessage(), null));
        // }
    }
}

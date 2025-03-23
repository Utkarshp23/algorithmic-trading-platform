package com.example.userservice.controller;

import com.angelbroking.smartapi.models.User;
import com.example.userservice.configuration.smartapi.SmartApiAuthenticationToken;
import com.example.userservice.model.LoginRequest;
import com.example.userservice.model.LoginResponse;
import com.example.userservice.service.BrokerAuthService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BrokerAuthService brokerAuthService;

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
            return new LoginResponse(true, "Login successful", jwtToken,smartApiUser.getUserName());
        } catch (Exception e) {
            e.printStackTrace();
            return new LoginResponse(false, "Invalid credentials: " + e.getMessage(), null,null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication instanceof SmartApiAuthenticationToken) {
                // Call the logout method on the BrokerAuthService
                brokerAuthService.logout();

                // Clear the security context
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("Logout successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during logout: " + e.getMessage());
        }
    }
}

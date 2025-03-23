package com.example.userservice.service;

import com.angelbroking.smartapi.SmartConnect;
import com.angelbroking.smartapi.models.User;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

@Service
public class BrokerAuthService {

    private final SmartConnect smartConnect;
    private final Dotenv dotenv;

    public BrokerAuthService(SmartConnect smartConnect, Dotenv dotenv) {
        this.smartConnect = smartConnect;
        this.dotenv = dotenv;
    }

    public User authenticate(String clientId, String mpin)  {
        //String clientId = dotenv.get("CLIENT_ID");
        //String password = dotenv.get("ANGLE_ONE_MPIN");
        String authenticatorKey = dotenv.get("AUTHENTICATOR_KEY");
        // Generate TOTP
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        int totp = gAuth.getTotpPassword(authenticatorKey);
        // Format the integer as a zero-padded 6-digit string
        String formattedTotp = String.format("%06d", totp);

        // Login and return user
        try {
            User user = smartConnect.generateSession(clientId, mpin, formattedTotp);
            smartConnect.setAccessToken(user.getAccessToken());
            smartConnect.setUserId(user.getUserId());
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage(), e);
        }
    }

    public void logout() {
        try {
            smartConnect.logout();
        } catch (Exception e) {
            throw new RuntimeException("Logout failed: " + e.getMessage(), e);
        }
    }

    public User getSmartApiUser() {
        try {
            User user = smartConnect.getProfile();
            return user;
            //System.out.println("User: " + user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get user: " + e.getMessage(), e);
        }
    }
}
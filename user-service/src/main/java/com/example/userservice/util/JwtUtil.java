package com.example.userservice.util;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.angelbroking.smartapi.models.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // private final String SECRET_KEY;
    // private final long JWT_EXPIRATION;

    // // Load environment variables
    // private final Dotenv dotenv = Dotenv.load();

    // public JwtUtil() {
    //     this.SECRET_KEY = dotenv.get("SECRET_KEY");
    //     this.JWT_EXPIRATION = Long.parseLong(dotenv.get("JWT_EXPIRATION")); // 10 hours default
    // }
    
    //private String SECRET_KEY = dotenv.get("JWT_SECRET");
    //private long JWT_EXPIRATION = Long.parseLong(dotenv.get("JWT_EXPIRATION"));

    private String SECRET_KEY = "your-256-bit-secret"; // Use a strong secret key (store in env variables)
    private long JWT_EXPIRATION = 1000 * 60 * 60 * 10; // 10 hours in milliseconds

    // Generate token for a user
    public String generateToken(String clientId, User smartApiUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("brokerUserId", smartApiUser.getUserId());
        claims.put("accessToken", smartApiUser.getAccessToken());
        return createToken(claims, clientId);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Validate token
    public Boolean validateToken(String token, String clientId) {
        final String username = extractClientId(token);
        return (username.equals(clientId) && !isTokenExpired(token));
    }

    // Extract clientId (subject) from token
    public String extractClientId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration date from token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Generic method to extract claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}

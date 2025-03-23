package com.example.userservice.configuration.filter;
import com.angelbroking.smartapi.models.User;
import com.example.userservice.configuration.smartapi.SmartApiAuthenticationToken;
import com.example.userservice.service.BrokerAuthService;
import com.example.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BrokerAuthService brokerAuthService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String clientId = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            clientId = jwtUtil.extractClientId(jwt);
        }

        if (clientId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwt, clientId)) {
                System.out.println("Valid token");
                // UsernamePasswordAuthenticationToken authToken = 
                //         new UsernamePasswordAuthenticationToken(clientId, null, null); // No authorities for simplicity
                // authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // SecurityContextHolder.getContext().setAuthentication(authToken);
                User smartApiUser = brokerAuthService.getSmartApiUser();
                // Create a SmartApiAuthenticationToken
                SmartApiAuthenticationToken authToken = new SmartApiAuthenticationToken(clientId, null, smartApiUser);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        chain.doFilter(request, response);
    }
}

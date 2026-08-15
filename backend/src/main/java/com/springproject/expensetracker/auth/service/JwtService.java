package com.springproject.expensetracker.auth.service;

import com.springproject.expensetracker.auth.security.UserPrincipal;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;
import java.util.Date;


@Service
public class JwtService {


    private final SecretKey secretKey;

    private final long expiration;


    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration
    ) {

        this.secretKey =
                Keys.hmacShaKeyFor(secret.getBytes());

        this.expiration = expiration;
    }


    public String generateToken(UserPrincipal principal) {

        return Jwts.builder()
                .subject(principal.getUsername())
                .claim("userId", principal.getId())
                .claim("role", principal.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey)
                .compact();
    }



    public String extractEmail(String token) {

        return getClaims(token)
                .getSubject();

    }



    public String extractRole(String token){

        return getClaims(token)
                .get("role", String.class);

    }



    public boolean isTokenValid(
            String token,
            UserDetails userDetails
    ){

        String email =
                extractEmail(token);


        return email.equals(userDetails.getUsername())
                &&
                !isExpired(token);

    }



    private boolean isExpired(String token){

        return getClaims(token)
                .getExpiration()
                .before(new Date());

    }



    private Claims getClaims(String token){

        return Jwts.parser()

                .verifyWith(secretKey)

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

}

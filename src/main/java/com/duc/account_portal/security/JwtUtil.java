package com.duc.account_portal.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import java.util.Date;
import java.util.function.Function;


@Component
public class JwtUtil {

  /**
   * The secret key used to sign the JWT tokens.
   */
  @Value("${spring.security.jwt.secret}")
  private String jwtSecret;

  /**
   * The expiration time for the JWT tokens in milliseconds.
   */
  @Value("${spring.security.jwt.expiration}")
  private long jwtExpirationMs;

  private SecretKey getSecretKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes());
  }

  /**
   * Generates a JWT token for the given username.
   *
   * @param username the username for which the token is generated
   * @return a JWT token as a String
   */
  public String generateToken(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(getSecretKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  /**
   * Retrieves the username from the given JWT token.
   *
   * @param token the JWT token
   * @return the username extracted from the token
   */
  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  /**
   * Retrieves the expiration date from the given JWT token.
   *
   * @param token the JWT token
   * @return the expiration date of the token
   */
  public Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  /**
   * Extracts a specific claim from the JWT token using the provided claims' resolver.
   *
   * @param token          the JWT token
   * @param claimsResolver a function to extract the desired claim
   * @param <T>            the type of the claim to be extracted
   * @return the extracted claim
   */
  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    Claims claims = Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody();
    return claimsResolver.apply(claims);
  }


  /**
   * Checks if the JWT token is expired.
   *
   * @param authToken the JWT token
   * @return true if the token is expired, false otherwise
   */
  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
          .build()
          .parseClaimsJws(authToken);
      return true;
    } catch (SecurityException | MalformedJwtException | ExpiredJwtException |
             UnsupportedJwtException | IllegalArgumentException e) {
      return false;
    }
  }
}
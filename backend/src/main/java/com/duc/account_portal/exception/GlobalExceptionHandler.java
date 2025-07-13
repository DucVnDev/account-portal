package com.duc.account_portal.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Handles BadCredentialsException, which is thrown when authentication fails due to incorrect
   * username or password.
   *
   * @param ex the exception that was thrown
   * @return a ResponseEntity with an error message and HTTP status 401 Unauthorized
   */
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
    Map<String, String> res = new HashMap<>();
    res.put("error", "Username or password is incorrect");
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
  }

  /**
   * Handles other exceptions that are not specifically handled by other methods.
   *
   * @param ex the exception that was thrown
   * @return a ResponseEntity with an error message and HTTP status 500 Internal Server Error
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleOther(Exception ex) {
    Map<String, String> res = new HashMap<>();
    res.put("error", ex.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
  }
}
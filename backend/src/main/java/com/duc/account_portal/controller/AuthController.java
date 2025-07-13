package com.duc.account_portal.controller;

import com.duc.account_portal.dto.AuthResponse;
import com.duc.account_portal.dto.LoginRequest;
import com.duc.account_portal.dto.RegisterRequest;
import com.duc.account_portal.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  /**
   * This endpoint is used for user registration. It accepts a RegisterRequest object containing
   * username, email, and password, and registers the user in the system.
   */
  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    authService.register(request);
    return ResponseEntity.ok("User registered successfully!");
  }

  /**
   * This endpoint is used for user login. It accepts a LoginRequest object containing username and
   * password, and returns an AuthResponse object containing the JWT token.
   */
  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    AuthResponse response = authService.authenticate(request);
    return ResponseEntity.ok(response);
  }
}
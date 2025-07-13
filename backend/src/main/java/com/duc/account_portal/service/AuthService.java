package com.duc.account_portal.service;

import com.duc.account_portal.dto.AuthResponse;
import com.duc.account_portal.dto.LoginRequest;
import com.duc.account_portal.dto.RegisterRequest;
import com.duc.account_portal.model.ERole;
import com.duc.account_portal.model.User;
import com.duc.account_portal.repository.UserRepository;
import com.duc.account_portal.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

  // This service handles user authentication and registration.
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  /**
   * Registers a new user with the provided registration details.
   *
   * @param request the registration request containing username, email, and password
   * @throws RuntimeException if the username or email is already taken
   */
  @Transactional
  public void register(RegisterRequest request) {
    if (userRepository.existsByUsername(request.getUsername())) {
      throw new RuntimeException("Username is already taken!");
    }
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email is already in use!");
    }
    User user = new User();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRoles(Collections.singleton(ERole.ROLE_USER));
    userRepository.save(user);
  }

  /**
   * Authenticates a user with the provided login credentials.
   *
   * @param request the login request containing username and password
   * @return an AuthResponse containing the JWT token and its type
   */
  public AuthResponse authenticate(LoginRequest request) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getUsername(), request.getPassword()
        )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtil.generateToken(request.getUsername());
    return new AuthResponse(jwt, "Bearer");
  }
}
package com.duc.account_portal.service;

import com.duc.account_portal.model.User;
import com.duc.account_portal.repository.UserRepository;
import com.duc.account_portal.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  /**
   * Retrieves a list of all users in the system.
   *
   * @return List of User objects representing all registered users.
   */
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }
  
}
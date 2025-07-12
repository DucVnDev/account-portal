package com.duc.account_portal.service;

import com.duc.account_portal.model.User;
import com.duc.account_portal.repository.UserRepository;
import com.duc.account_portal.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * Loads user details by username.
   *
   * @param username the username of the user
   * @return UserDetails object containing user information
   * @throws UsernameNotFoundException if the user is not found
   */
  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
        .orElseThrow(() ->
            new UsernameNotFoundException("User Not Found with username: " + username));
    return new CustomUserDetails(user);
  }
}
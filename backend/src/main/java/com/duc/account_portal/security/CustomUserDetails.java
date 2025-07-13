package com.duc.account_portal.security;

import com.duc.account_portal.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

  private final User user;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return user.getRoles()
        .stream()
        .map(role -> new SimpleGrantedAuthority(role.name()))
        .collect(Collectors.toSet());
  }

  /**
   * Returns the password of the user.
   */
  @Override
  public String getPassword() {
    return user.getPassword();
  }

  /**
   * Returns the username of the user.
   */
  @Override
  public String getUsername() {
    return user.getUsername();
  }

  /**
   * Returns the account's expiration status.
   *
   * @return true if the account is not expired, false otherwise.
   */
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  /**
   * Returns the account's lock status.
   *
   * @return true if the account is not locked, false otherwise.
   */
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  /**
   * Returns the credentials' expiration status.
   *
   * @return true if the credentials are not expired, false otherwise.
   */
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  /**
   * Returns the enabled status of the user account.
   *
   * @return true if the user account is enabled, false otherwise.
   */
  @Override
  public boolean isEnabled() {
    return true;
  }

  /**
   * Returns the User object associated with this CustomUserDetails.
   *
   * @return the User object
   */
  public User getUser() {
    return user;
  }
  
}
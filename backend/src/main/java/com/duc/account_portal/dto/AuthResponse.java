package com.duc.account_portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

  /**
   * The JWT token generated after successful authentication.
   */
  private String token;
  /**
   * The type of the token, typically "Bearer".
   */
  private String type = "Bearer";
}
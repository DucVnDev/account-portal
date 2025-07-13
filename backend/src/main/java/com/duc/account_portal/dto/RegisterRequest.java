package com.duc.account_portal.dto;

import lombok.Data;

@Data
public class RegisterRequest {

  /**
   * The username of the user registering.
   */
  private String username;
  /**
   * The email of the user registering.
   */
  private String email;
  /**
   * The password of the user registering.
   */
  private String password;
}
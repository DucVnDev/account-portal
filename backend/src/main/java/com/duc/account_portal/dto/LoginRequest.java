package com.duc.account_portal.dto;

import lombok.Data;

@Data
public class LoginRequest {

  // The username of the user trying to log in.
  private String username;
  // The password of the user trying to log in.
  private String password;
}
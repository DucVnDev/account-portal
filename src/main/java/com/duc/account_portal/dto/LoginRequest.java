package com.duc.account_portal.dto;

import lombok.Data;

@Data
public class LoginRequest {

  private String username;
  private String password;
}
package com.duc.account_portal.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {

  /**
   * This method is called when an unauthenticated user tries to access a secured endpoint. It sends
   * a 401 Unauthorized response.
   *
   * @param request       the HttpServletRequest
   * @param response      the HttpServletResponse
   * @param authException the AuthenticationException that occurred
   */
  @Override
  public void commence(HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException authException)
      throws IOException, ServletException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
  }
}
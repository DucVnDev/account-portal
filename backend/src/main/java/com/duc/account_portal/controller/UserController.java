package com.duc.account_portal.controller;

import com.duc.account_portal.model.User;
import com.duc.account_portal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  /**
   * Retrieves a list of all users.
   *
   * @return ResponseEntity containing a list of User objects.
   */
  @GetMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  /**
   * Retrieves the profile of the currently authenticated user.
   *
   * @return ResponseEntity containing the User object representing the current user's profile.
   */
  @GetMapping("/me")
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  public ResponseEntity<User> getCurrentUser() {
    return ResponseEntity.ok(userService.getCurrentUserProfile());
  }

  /**
   * Updates the profile of the currently authenticated user.
   *
   * @param updateUser User object containing updated information for the current user.
   * @return ResponseEntity containing the updated User object.
   */
  @PutMapping("/me")
  @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
  public ResponseEntity<User> updateProfile(@RequestBody User updateUser) {
    return ResponseEntity.ok(userService.updateCurrentUserProfile(updateUser));
  }


  /**
   * Deletes a user by their ID.
   *
   * @param id the ID of the user to delete
   * @return ResponseEntity indicating the result of the deletion operation
   */
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    userService.deleteUserById(id);
    return ResponseEntity.ok("User deleted successfully");
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param id the ID of the user to retrieve
   * @return ResponseEntity containing the User object if found, or 404 Not Found if not found
   */
  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getUserById(id));
  }
}


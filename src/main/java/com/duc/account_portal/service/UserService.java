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

  /**
   * Retrieves the profile of the currently authenticated user.
   *
   * @return User object representing the current user's profile.
   */
  public User getCurrentUserProfile() {
    CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder
        .getContext().getAuthentication().getPrincipal();
    return userDetails.getUser();
  }

//  /**
//   * Updates the profile of the currently authenticated user.
//   *
//   * @param updateUser User object containing updated information for the current user.
//   * @return User object representing the updated user profile.
//   */
//  public User updateCurrentUserProfile(User updateUser) {
//    CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder
//        .getContext().getAuthentication().getPrincipal();
//    User currentUser = userDetails.getUser();
//
//    currentUser.setEmail(updateUser.getEmail());
//    currentUser.setUsername(updateUser.getUsername());
//    currentUser.setAvatar(updateUser.getAvatar()); // nếu có trường avatar
//
//    return userRepository.save(currentUser);
//  }

  /**
   * Deletes a user by their ID.
   *
   * @param id the ID of the user to delete
   */
  public void deleteUserById(Long id) {
    userRepository.deleteById(id);
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param id the ID of the user to retrieve
   * @return User object representing the user with the specified ID
   * @throws RuntimeException if the user is not found
   */
  public User getUserById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
  }


}
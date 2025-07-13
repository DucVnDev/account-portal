package com.duc.account_portal.repository;

import com.duc.account_portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository interface for managing User entities. Provides methods to find users by username or
 * email, and to check existence of users by these fields.
 */
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Finds a user by their username.
   *
   * @param username the username of the user to find
   * @return an Optional containing the User if found, or empty if not found
   */
  Optional<User> findByUsername(String username);

  /**
   * Finds a user by their email.
   *
   * @param email the email of the user to find
   * @return an Optional containing the User if found, or empty if not found
   */
  Optional<User> findByEmail(String email);

  /**
   * Checks if a user exists by their username.
   *
   * @param username the username to check
   * @return true if a user with the given username exists, false otherwise
   */
  Boolean existsByUsername(String username);

  /**
   * Checks if a user exists by their email.
   *
   * @param email the email to check
   * @return true if a user with the given email exists, false otherwise
   */
  Boolean existsByEmail(String email);
}
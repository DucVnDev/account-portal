package com.duc.account_portal.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Represents a user entity in the system. Stores user credentials and roles.
 */
@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

  /**
   * The unique identifier for the user.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * The username of the user.
   */
  @Column(nullable = false, length = 50)
  private String username;

  /**
   * The email address of the user.
   */
  @Column(nullable = false, length = 100)
  private String email;

  /**
   * The encrypted password of the user.
   */
  @Column(nullable = false)
  private String password;

  /**
   * The set of roles assigned to the user.
   */
  @ElementCollection(fetch = FetchType.EAGER)
  @Enumerated(EnumType.STRING)
  @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "role")
  private Set<ERole> roles = new HashSet<>();
}
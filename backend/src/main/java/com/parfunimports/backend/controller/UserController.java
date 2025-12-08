package com.parfunimports.backend.controller;

import com.parfunimports.backend.domain.User;
import com.parfunimports.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

/**
 * Controller responsável por expor endpoints REST relacionados a usuários.
 * Integra com o UserService e aplica regras de autorização via Spring Security.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================
    // Endpoints REST
    // =========================

    /** Listar todos os usuários (precisa da permission "read:users") */
    @GetMapping
    @PreAuthorize("hasAuthority('read:users')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    /** Buscar usuário por ID (precisa da permission "read:users") */
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('read:users')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = Optional.ofNullable(userService.findById(id));
        return userOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /** Criar novo usuário (precisa da permission "create:users") */
    @PostMapping
    @PreAuthorize("hasAuthority('create:users')")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity
                    .created(URI.create("/api/users/" + savedUser.getId()))
                    .body(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /** Atualizar usuário existente (precisa da permission "create:users") */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('create:users')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /** Deletar usuário (precisa da permission "delete:users") */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:users')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }

    /** Buscar usuário por email (precisa da permission "read:users") */
    @GetMapping("/email/{email}")
    @PreAuthorize("hasAuthority('read:users')")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> userOpt = userService.findByEmail(email);
        return userOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

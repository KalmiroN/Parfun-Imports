package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.User;
import com.parfunimports.backend.model.Order;
import com.parfunimports.backend.model.Role;
import com.parfunimports.backend.dto.UserDTO;
import com.parfunimports.backend.dto.UserMapper;
import com.parfunimports.backend.repository.UserRepository;
import com.parfunimports.backend.repository.OrderRepository;
import com.parfunimports.backend.security.CustomUserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, OrderRepository orderRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userMapper = userMapper;
    }

    // 📌 Registrar novo usuário
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email já registrado."));
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRole(Role.CLIENTE);
        userRepository.save(newUser);

        return ResponseEntity.ok(userMapper.fromEntity(newUser));
    }

    // 📌 Alterar senha
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        User user = existingUser.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso!"));
    }

    public static class ChangePasswordRequest {
        private String email;
        private String newPassword;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

    // 📌 Dados do usuário autenticado
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal CustomUserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuário não autenticado"));
        }

        Optional<User> userOpt = userRepository.findById(principal.getId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        return ResponseEntity.ok(userMapper.fromEntity(userOpt.get()));
    }

    // 📌 Atualizar dados do usuário autenticado
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal CustomUserPrincipal principal,
                                        @RequestBody UpdateUserRequest request) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuário não autenticado"));
        }

        Optional<User> userOpt = userRepository.findById(principal.getId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        User user = userOpt.get();

        if (request.getName() != null) user.setName(request.getName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRole() != null && !request.getRole().isBlank()) {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Role inválido. Use CLIENTE ou ADMIN."));
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok(userMapper.fromEntity(user));
    }

    // 📌 Listar pedidos do usuário autenticado
    @GetMapping("/orders")
    public ResponseEntity<?> getOrders(@AuthenticationPrincipal CustomUserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Usuário não autenticado"));
        }

        List<Order> orders = orderRepository.findByCustomerEmail(principal.getEmail());
        return ResponseEntity.ok(orders);
    }

    // 📌 Promover usuário a ADMIN (somente ADMIN pode usar)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/promote/{email}")
    public ResponseEntity<?> promoteToAdmin(@PathVariable String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuário não encontrado"));
        }

        User user = userOpt.get();
        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return ResponseEntity.ok(userMapper.fromEntity(user));
    }

    // 📌 Debug (apenas para testes)
    @GetMapping("/debug/{email}")
    public ResponseEntity<?> debugUser(@PathVariable String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return ResponseEntity.ok(userOpt.map(userMapper::fromEntity).orElse(null));
    }

    // DTO para atualização de usuário
    public static class UpdateUserRequest {
        private String name;
        private String email;
        private String phone;
        private String address;
        private String password;
        private String role;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
}
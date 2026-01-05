package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.Role;
import com.parfunimports.backend.model.User;
import com.parfunimports.backend.repository.UserRepository;
import com.parfunimports.backend.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // 🔑 Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciais inválidas"));
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciais inválidas"));
        }

        if (user.getRole() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Usuário sem role definida."));
        }

        // Gera tokens
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        // Retorna DTO completo
        return ResponseEntity.ok(new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().name(),
                user.getPhone(),
                user.getAddress(),
                accessToken,
                refreshToken
        ));
    }

    // ➕ Endpoint de registro
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email já cadastrado"));
        }

        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(Role.CLIENTE)
                .build();

        userRepository.save(newUser);

        if (newUser.getRole() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao registrar usuário: role não definida."));
        }

        String accessToken = jwtUtil.generateAccessToken(newUser.getEmail(), newUser.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(newUser.getEmail());

        return ResponseEntity.ok(new LoginResponse(
                newUser.getId(),
                newUser.getEmail(),
                newUser.getName(),
                newUser.getRole().name(),
                newUser.getPhone(),
                newUser.getAddress(),
                accessToken,
                refreshToken
        ));
    }

    // 🔄 Endpoint de refresh
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            String email = jwtUtil.extractEmail(refreshToken);

            if (!jwtUtil.validateToken(refreshToken, email)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Refresh token inválido ou expirado"));
            }

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Usuário não encontrado"));
            }

            User user = userOpt.get();
            String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole());

            return ResponseEntity.ok(Map.of(
                    "accessToken", newAccessToken,
                    "refreshToken", refreshToken
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Falha ao renovar token"));
        }
    }

    // DTOs internos
    public static class LoginRequest {
        private String email;
        private String password;
        // getters e setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String name;
        private String phone;
        private String address;
        // getters e setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
    }

    public static class RefreshRequest {
        private String refreshToken;
        public String getRefreshToken() { return refreshToken; }
        public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
    }

    public static class LoginResponse {
        private Long id;
        private String email;
        private String name;
        private String role;
        private String phone;
        private String address;
        private String accessToken;
        private String refreshToken;

        public LoginResponse(Long id, String email, String name, String role,
                             String phone, String address,
                             String accessToken, String refreshToken) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.role = role;
            this.phone = phone;
            this.address = address;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

        // getters
        public Long getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
        public String getRole() { return role; }
        public String getPhone() { return phone; }
        public String getAddress() { return address; }
        public String getAccessToken() { return accessToken; }
        public String getRefreshToken() { return refreshToken; }
    }
}

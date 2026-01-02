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

    // ✅ Injeção via construtor
    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // 🔑 Endpoint de login: valida credenciais e gera JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciais inválidas"));
        }

        User user = userOpt.get();

        // ✅ valida senha com BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciais inválidas"));
        }

        // 🚨 proteção extra: role não pode ser nula
        if (user.getRole() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Usuário sem role definida. Contate o administrador."));
        }

        // ✅ gera token com email e role (enum)
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // ✅ retorna DTO com token e dados do usuário
        return ResponseEntity.ok(new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().name(), // retorna "CLIENTE" ou "ADMIN"
                user.getPhone(),
                user.getAddress(),
                token
        ));
    }

    // ➕ Endpoint de registro: cria novo usuário
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Verifica se já existe usuário com o mesmo email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email já cadastrado"));
        }

        // Cria novo usuário com senha criptografada
        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(Role.CLIENTE) // por padrão, novos usuários são CLIENTE
                .build();

        userRepository.save(newUser);

        // 🚨 proteção extra: role não pode ser nula
        if (newUser.getRole() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erro ao registrar usuário: role não definida."));
        }

        // Gera token para o novo usuário
        String token = jwtUtil.generateToken(newUser.getEmail(), newUser.getRole());

        return ResponseEntity.ok(new LoginResponse(
                newUser.getId(),
                newUser.getEmail(),
                newUser.getName(),
                newUser.getRole().name(),
                newUser.getPhone(),
                newUser.getAddress(),
                token
        ));
    }

    // 📌 DTO para requisição de login
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // 📌 DTO para requisição de registro
    public static class RegisterRequest {
        private String email;
        private String password;
        private String name;
        private String phone;
        private String address;

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

    // 📌 DTO para resposta de login/registro
    public static class LoginResponse {
        private Long id;
        private String email;
        private String name;
        private String role;
        private String phone;
        private String address;
        private String accessToken;

        public LoginResponse(Long id, String email, String name, String role,
                             String phone, String address, String accessToken) {
            this.id = id;
            this.email = email;
            this.name = name;
            this.role = role;
            this.phone = phone;
            this.address = address;
            this.accessToken = accessToken;
        }

        // ✅ construtor simples só com token (útil em testes)
        public LoginResponse(String token) {
            this.accessToken = token;
        }

        // getters
        public Long getId() { return id; }
        public String getEmail() { return email; }
        public String getName() { return name; }
        public String getRole() { return role; }
        public String getPhone() { return phone; }
        public String getAddress() { return address; }
        public String getAccessToken() { return accessToken; }
    }
}

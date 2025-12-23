package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.User;
import com.parfunimports.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // 🔑 Injeta a chave secreta do application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // 📌 Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User login) {
        Optional<User> existingUser = userRepository.findByEmail(login.getEmail());

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (passwordEncoder.matches(login.getPassword(), user.getPassword())) {
                // ✅ Gera JWT seguro
                SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));

                String token = Jwts.builder()
                        .setSubject(user.getEmail())
                        .claim("role", user.getRole())
                        .claim("name", user.getName())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // expira em 1h
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact();

                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("email", user.getEmail());
                response.put("name", user.getName());
                response.put("roles", List.of(user.getRole()));
                response.put("phone", user.getPhone());
                response.put("address", user.getAddress());
                response.put("accessToken", token);

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Credenciais inválidas"));
    }

    // 📌 Endpoint para registrar novo usuário (senha criptografada)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Email já registrado."));
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("id", newUser.getId());
        response.put("email", newUser.getEmail());
        response.put("name", newUser.getName());
        response.put("roles", List.of(newUser.getRole()));
        response.put("phone", newUser.getPhone());
        response.put("address", newUser.getAddress());
        response.put("message", "Usuário registrado com sucesso!");

        return ResponseEntity.ok(response);
    }

    // 📌 Endpoint para alterar senha
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Usuário não encontrado."));
        }

        User user = existingUser.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Senha alterada com sucesso!"));
    }

    // 📌 Endpoint para obter dados do usuário autenticado
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token não fornecido"));
            }

            String token = authHeader.substring(7); // remove "Bearer "
            SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));

            var claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuário não encontrado"));
            }

            User user = userOpt.get();

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("name", user.getName());
            response.put("roles", List.of(user.getRole()));
            response.put("phone", user.getPhone());
            response.put("address", user.getAddress());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // ✅ loga no console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Falha ao processar token"));
        }
    }

    // 📌 Endpoint para atualizar dados do usuário autenticado
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateUserRequest request) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token não fornecido"));
            }

            String token = authHeader.substring(7);
            SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtSecret));

            var claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String email = claims.getSubject();

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Usuário não encontrado"));
            }

            User user = userOpt.get();

            // Atualiza os campos
            if (request.getName() != null) user.setName(request.getName());
            if (request.getEmail() != null) user.setEmail(request.getEmail());
            if (request.getPhone() != null) user.setPhone(request.getPhone());
            if (request.getAddress() != null) user.setAddress(request.getAddress());

            // Atualiza senha se enviada
            if (request.getPassword() != null && !request.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }

            userRepository.save(user);

            // ✅ Retorna todos os campos atualizados
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Perfil atualizado com sucesso!");
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("name", user.getName());
            response.put("roles", List.of(user.getRole()));
            response.put("phone", user.getPhone());
            response.put("address", user.getAddress());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Falha ao atualizar perfil"));
        }
    }

    // Classe auxiliar para receber o corpo da requisição de troca de senha
    public static class ChangePasswordRequest {
        private String email;
        private String newPassword;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

    // Classe auxiliar para receber o corpo da requisição de atualização de perfil
    public static class UpdateUserRequest {
        private String name;
        private String email;
        private String phone;
        private String address;
        private String password;

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
    }
}


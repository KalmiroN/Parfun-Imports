package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.auth.RegisterRequest;
import com.parfunimports.backend.dto.auth.LoginRequest;
import com.parfunimports.backend.dto.auth.AuthResponse;
import com.parfunimports.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174") // ✅ libera o frontend
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ Endpoint de registro
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            // O AuthService deve criar o usuário, gerar token e retornar role
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse("Erro ao registrar: " + e.getMessage(), null, null));
        }
    }

    // ✅ Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            // O AuthService deve validar credenciais, gerar token e retornar role
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new AuthResponse("Erro ao autenticar: " + e.getMessage(), null, null));
        }
    }
}

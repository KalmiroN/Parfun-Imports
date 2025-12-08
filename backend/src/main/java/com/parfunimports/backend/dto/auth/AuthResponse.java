package com.parfunimports.backend.dto.auth;

/**
 * DTO de resposta para operações de autenticação.
 * Inclui mensagem, token (pode ser null quando usamos Auth0)
 * e o role do usuário.
 */
public class AuthResponse {

    private String message;
    private String token;
    private String role; // ✅ campo para role do usuário

    public AuthResponse() {}

    public AuthResponse(String message) {
        this.message = message;
    }

    public AuthResponse(String message, String token, String role) {
        this.message = message;
        this.token = token;
        this.role = role;
    }

    // =========================
    // Getters e Setters
    // =========================
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

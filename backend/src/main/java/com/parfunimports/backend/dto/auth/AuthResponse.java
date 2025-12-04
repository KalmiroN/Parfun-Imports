package com.parfunimports.backend.dto.auth;

public class AuthResponse {
    private String message;
    private String token;
    private String role; // ✅ novo campo

    public AuthResponse() {}

    public AuthResponse(String message) {
        this.message = message;
    }

    public AuthResponse(String message, String token, String role) {
        this.message = message;
        this.token = token;
        this.role = role;
    }

    // Getters e Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

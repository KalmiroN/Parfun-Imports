package com.parfunimports.backend.dto;

/**
 * DTO para resposta de login.
 * Inclui tokens de autenticação além dos dados básicos do usuário.
 */
public record LoginResponse(
        Long id,
        String email,
        String name,
        String role,
        String phone,
        String address,
        String accessToken,
        String refreshToken
) {}

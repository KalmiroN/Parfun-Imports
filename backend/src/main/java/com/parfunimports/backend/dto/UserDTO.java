package com.parfunimports.backend.dto;

/**
 * DTO para usuários.
 * - Não expõe senha nem dados sensíveis.
 * - Apenas informações necessárias para o frontend.
 */
public record UserDTO(
        Long id,
        String name,
        String email,
        String phone,
        String address,
        String role
) {}
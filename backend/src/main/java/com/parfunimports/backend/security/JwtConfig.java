package com.parfunimports.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração central para expor JwtUtil como bean.
 * Injeta secret e tempo de expiração definidos no application.properties.
 */
@Configuration
public class JwtConfig {

    // 🔑 injeta a chave secreta definida no application.properties ou via variável de ambiente
    @Value("${jwt.secret}")
    private String secret;

    // ⏱ injeta tempo de expiração do token (em ms)
    @Value("${jwt.expiration}")
    private long expirationMs;

    // ✅ expõe JwtUtil como bean único e centralizado
    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil(secret, expirationMs);
    }
}

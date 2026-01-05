package com.parfunimports.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuração central para expor JwtUtil como bean.
 * Injeta secret e tempos de expiração definidos no application.properties.
 */
@Configuration
public class JwtConfig {

    // 🔑 injeta a chave secreta definida no application.properties ou via variável de ambiente
    @Value("${jwt.secret}")
    private String secret;

    // ⏱ injeta tempo de expiração do Access Token (em ms)
    @Value("${jwt.access.expiration}")
    private long accessExpirationMs;

    // ⏱ injeta tempo de expiração do Refresh Token (em ms)
    @Value("${jwt.refresh.expiration}")
    private long refreshExpirationMs;

    // ✅ expõe JwtUtil como bean único e centralizado
    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil(secret, accessExpirationMs, refreshExpirationMs);
    }
}

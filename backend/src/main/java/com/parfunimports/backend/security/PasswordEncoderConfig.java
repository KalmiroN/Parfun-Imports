package com.parfunimports.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuração do PasswordEncoder para uso em autenticação.
 * Expõe um bean de BCryptPasswordEncoder para ser injetado em AuthController e outros serviços.
 */
@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // ✅ BCrypt é seguro e recomendado para hashing de senhas
        return new BCryptPasswordEncoder();
    }
}

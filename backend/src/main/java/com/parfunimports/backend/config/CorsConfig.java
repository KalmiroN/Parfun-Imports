package com.parfunimports.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Configuração global de CORS para permitir chamadas do frontend.
 * - Permite origens configuráveis via application.properties (cors.allowed-origins).
 * - Habilita métodos e headers necessários para comunicação segura.
 * - Suporta credenciais (cookies, Authorization header).
 */
@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();

        // 🌐 Origem definida pelo profile ativo (dev ou prod)
        cors.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));

        // ✅ Métodos permitidos
        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

        // 📦 Headers permitidos
        cors.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

        // 🔑 Permitir envio de cookies/credenciais (ex.: Authorization: Bearer token)
        cors.setAllowCredentials(true);

        // ⏱ Tempo de cache da configuração (em segundos)
        cors.setMaxAge(3600L);

        // ✅ Registra configuração para todas as rotas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
}

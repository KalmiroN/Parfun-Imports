package com.parfunimports.backend.security;

import com.parfunimports.backend.model.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * Utilitário para geração e validação de tokens JWT.
 * - Inclui email (subject) e role como claims.
 * - Usa chave secreta definida no application.properties.
 * - Expiração configurável via application.properties.
 */
@Component
public class JwtUtil {

    private final Key secretKey;
    private final long expirationMs;

    // ✅ Construtor injeta secret e expiração do application.properties
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expiration}") long expirationMs) {
        Key key;
        try {
            byte[] keyBytes = java.util.Base64.getDecoder().decode(secret);
            key = Keys.hmacShaKeyFor(keyBytes);
        } catch (IllegalArgumentException e) {
            // fallback: secret como texto puro
            key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
        this.secretKey = key;   // ✅ atribuição única ao campo final
        this.expirationMs = expirationMs;
    }

    // 📌 Extrair e-mail (subject) do token
    public String extractEmail(String token) {
        try {
            return getClaims(token).getSubject();
        } catch (ExpiredJwtException e) {
            throw new IllegalArgumentException("Token expirado", e);
        } catch (JwtException e) {
            throw new IllegalArgumentException("Token inválido", e);
        }
    }

    // 📌 Extrair role do token como enum
    public Role extractRole(String token) {
        try {
            String roleStr = (String) getClaims(token).get("role");
            return Role.valueOf(roleStr); // converte para Role.ADMIN ou Role.CLIENTE
        } catch (ExpiredJwtException e) {
            throw new IllegalArgumentException("Token expirado", e);
        } catch (JwtException | IllegalArgumentException e) {
            throw new IllegalArgumentException("Token inválido", e);
        }
    }

    // 📌 Gerar token com e-mail e role
    public String generateToken(String email, Role role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(email) // subject = email
                .claim("role", role.name()) // inclui papel (ADMIN, CLIENTE)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // 📌 Validar token
    public boolean validateToken(String token, String email) {
        try {
            String extractedEmail = extractEmail(token);
            return (extractedEmail.equals(email) && !isTokenExpired(token));
        } catch (JwtException e) {
            return false;
        }
    }

    // 📌 Verificar expiração
    private boolean isTokenExpired(String token) {
        Date expiration = getClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    // 📌 Obter claims de forma segura
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

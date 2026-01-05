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
 * - Suporte a AccessToken (curto prazo) e RefreshToken (longo prazo).
 */
@Component
public class JwtUtil {

    private final Key secretKey;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;

    // ✅ Construtor injeta secret e tempos de expiração do application.properties
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.access.expiration}") long accessTokenExpirationMs,
                   @Value("${jwt.refresh.expiration}") long refreshTokenExpirationMs) {
        Key key;
        try {
            byte[] keyBytes = java.util.Base64.getDecoder().decode(secret);
            key = Keys.hmacShaKeyFor(keyBytes);
        } catch (IllegalArgumentException e) {
            // fallback: secret como texto puro
            key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
        this.secretKey = key;
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
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
            return Role.valueOf(roleStr);
        } catch (ExpiredJwtException e) {
            throw new IllegalArgumentException("Token expirado", e);
        } catch (JwtException | IllegalArgumentException e) {
            throw new IllegalArgumentException("Token inválido", e);
        }
    }

    // 📌 Gerar AccessToken com e-mail e role
    public String generateAccessToken(String email, Role role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + accessTokenExpirationMs);

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role.name())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // 📌 Gerar RefreshToken apenas com e-mail
    public String generateRefreshToken(String email) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + refreshTokenExpirationMs);

        return Jwts.builder()
                .setSubject(email)
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

package com.parfunimports.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

/**
 * Serviço utilitário para manipulação de tokens JWT emitidos pelo Auth0.
 * Utiliza a biblioteca java-jwt da Auth0.
 * OBS: A validação completa (assinatura, issuer, audience) é feita pelo JwtDecoder/JwtConfig.
 */
@Service
public class JwtService {

    /**
     * Extrai o e-mail do claim "email" do token.
     * Se não existir, usa o "sub" como identificador.
     *
     * @param token JWT emitido pelo Auth0
     * @return email ou identificador único do usuário
     */
    public String extractEmail(String token) {
        try {
            DecodedJWT decoded = JWT.decode(token);
            String email = decoded.getClaim("email").asString();
            if (email == null || email.isBlank()) {
                email = decoded.getSubject(); // fallback para sub
            }
            return email;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Extrai o role do claim "roles" do token.
     * Esse claim precisa estar configurado no Auth0 (Rules ou Actions).
     *
     * @param token JWT emitido pelo Auth0
     * @return role do usuário ou null se não existir
     */
    public String extractRole(String token) {
        try {
            DecodedJWT decoded = JWT.decode(token);
            return decoded.getClaim("roles").asString();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Verifica se o token é sintaticamente válido.
     * OBS: Não valida assinatura, issuer ou audience.
     * Para validação completa, use JwtDecoder (JwtConfig).
     *
     * @param token JWT emitido pelo Auth0
     * @return true se o token é válido sintaticamente, false caso contrário
     */
    public boolean isTokenValid(String token) {
        try {
            JWT.decode(token); // se decodificar sem erro, é válido sintaticamente
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

package com.parfunimports.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwk.Jwk;
import com.parfunimports.backend.repository.UserRepository;
import com.parfunimports.backend.domain.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.interfaces.RSAPublicKey;
import java.util.concurrent.TimeUnit;

/**
 * Filtro JWT que valida tokens emitidos pelo Auth0.
 * Usa a chave pública obtida via JWKS para verificar assinatura RS256.
 * OBS: Se já estiver usando oauth2ResourceServer no SecurityConfig,
 * este filtro pode ser opcional.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwkProvider jwkProvider;

    private static final String ISSUER = "https://dev-w4m4ego8rxl0jjzq.us.auth0.com/";
    private static final String AUDIENCE = "http://localhost:8080/api";

    public JwtAuthenticationFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.jwkProvider = new JwkProviderBuilder(ISSUER)
                .cached(10, 24, TimeUnit.HOURS) // cache de chaves públicas
                .build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            // Decodifica o token sem validar ainda
            DecodedJWT decoded = JWT.decode(token);

            // Busca a chave pública correspondente ao kid do token
            Jwk jwk = jwkProvider.get(decoded.getKeyId());
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

            // Cria o verificador com issuer e audience do Auth0
            JWTVerifier verifier = JWT.require(algorithm)
                    .withAudience(AUDIENCE)
                    .withIssuer(ISSUER)
                    .build();

            // Valida assinatura e claims obrigatórios
            verifier.verify(token);

            // Extrai email (ou sub se email não estiver presente)
            String email = decoded.getClaim("email").asString();
            if (email == null) {
                email = decoded.getSubject(); // fallback para sub
            }

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userRepository.findByEmail(email).orElse(null);

                if (user != null) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    null,
                                    user.getAuthorities()
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Token inválido → não autentica, segue fluxo normal
            // (pode logar aqui para debug)
        }

        filterChain.doFilter(request, response);
    }
}


package com.parfunimports.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

/**
 * Configuração de segurança do Spring Boot integrada ao Auth0.
 * Define endpoints públicos e restritos, valida tokens JWT e aplica permissões.
 */
@Configuration
@EnableMethodSecurity // 🔑 habilita @PreAuthorize nos controllers
public class SecurityConfig {

    private static final String ISSUER = "https://dev-w4m4ego8rxl0jjzq.us.auth0.com/";
    private static final String AUDIENCE = "http://localhost:8080/api";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos
                .requestMatchers("/api/auth/**", "/api/public/**").permitAll()

                // Produtos
                .requestMatchers(HttpMethod.GET, "/api/products/**").hasAuthority("read:products")
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAuthority("create:products")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasAuthority("update:products")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority("delete:products")

                // Pedidos
                .requestMatchers(HttpMethod.GET, "/api/orders/**").hasAuthority("read:orders")
                .requestMatchers(HttpMethod.POST, "/api/orders/**").hasAuthority("create:orders")
                .requestMatchers(HttpMethod.PUT, "/api/orders/**").hasAuthority("update:orders")
                .requestMatchers(HttpMethod.DELETE, "/api/orders/**").hasAuthority("delete:orders")

                // Usuários
                .requestMatchers(HttpMethod.GET, "/api/users/**").hasAuthority("read:users")
                .requestMatchers(HttpMethod.POST, "/api/users/**").hasAuthority("create:users")
                .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAuthority("update:users")
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAuthority("delete:users")

                // Endpoints restritos adicionais
                .requestMatchers("/api/admin/**").hasAuthority("admin:manage")
                .requestMatchers("/api/user/**").hasAuthority("read:profile")

                // Qualquer outra requisição precisa estar autenticada
                .anyRequest().authenticated()
            )
            // Integração com Auth0 usando nosso JwtAuthConverter
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(new JwtAuthConverter())));

        return http.build();
    }

    /**
     * Configura o JwtDecoder para validar issuer e audience do token JWT.
     */
    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromIssuerLocation(ISSUER);

        // ✅ Tipagem explícita <Jwt>
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(ISSUER);
        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(List.of(AUDIENCE));

        OAuth2TokenValidator<Jwt> validator =
            new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(validator);
        return jwtDecoder;
    }
}

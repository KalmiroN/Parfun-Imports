package com.parfunimports.backend.security;

import com.parfunimports.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuração central de segurança com Spring Security + JWT.
 */
@Configuration
@EnableMethodSecurity(prePostEnabled = true) // ✅ habilita @PreAuthorize nos controllers
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    // ✅ injeta JwtUtil e UserRepository via construtor
    public SecurityConfig(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // ✅ expõe AuthenticationManager como bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource)
            throws Exception {
        http
            // 🔒 desabilita CSRF porque estamos usando JWT
            .csrf(csrf -> csrf.disable())
            // 🌐 habilita CORS usando o bean de CorsConfig
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            // 🛑 sem sessão, tudo é stateless com JWT
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .requestCache(rc -> rc.disable())
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos de autenticação
                .requestMatchers("/api/auth/login", "/api/auth/refresh", "/api/user/register").permitAll()

                // Catálogo de produtos é público
                .requestMatchers("/api/products/**").permitAll()

                // OPTIONS liberado para preflight CORS
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Liberar /error para não cair em 403
                .requestMatchers("/error").permitAll()

                // Pedidos do cliente autenticado (precisa ser CLIENTE)
                .requestMatchers("/api/orders/my").hasRole("CLIENTE")

                // Endpoints de administração (somente ADMIN)
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // ✅ endpoints protegidos
                .requestMatchers("/api/user/me").authenticated()
                .requestMatchers("/api/user/update").authenticated()
                .requestMatchers("/api/user/orders").authenticated()

                // ✅ proteger endpoints de salvar para depois
                .requestMatchers("/api/savelater/**").authenticated()

                // Qualquer outra requisição precisa estar autenticada
                .anyRequest().authenticated()
            )
            // 🚫 desabilita login via formulário e basic auth
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())
            .exceptionHandling(ex -> ex
                // ✅ devolve 401 em vez de 403 quando não autenticado
                .authenticationEntryPoint((req, res, e) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            );

        // ✅ adiciona o filtro JWT antes do UsernamePasswordAuthenticationFilter
        http.addFilterBefore(new JwtAuthenticationFilter(jwtUtil, userRepository),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

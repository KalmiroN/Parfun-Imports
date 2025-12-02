package com.parfunimports.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 👉 usado para criptografar senhas
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // em APIs REST geralmente desativamos CSRF
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos (ex.: cadastro e login)
                .requestMatchers("/api/auth/**", "/api/public/**").permitAll()

                // Endpoints restritos para ADMIN
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Endpoints restritos para USER
                .requestMatchers("/api/user/**").hasRole("USER")

                // Qualquer outro endpoint precisa estar autenticado
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")       // página de login customizada (se tiver frontend)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .permitAll()
            );

        return http.build();
    }
}


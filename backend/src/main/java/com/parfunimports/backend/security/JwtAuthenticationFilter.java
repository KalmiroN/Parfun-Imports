package com.parfunimports.backend.security;

import com.parfunimports.backend.service.JwtService;
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

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Se não houver header ou não começar com "Bearer ", segue o fluxo sem autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // remove "Bearer "
        userEmail = jwtService.extractEmail(jwt);

        // Se conseguimos extrair o email e ainda não há autenticação no contexto
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(userEmail).orElse(null);

            if (user != null && jwtService.isTokenValid(jwt, user)) {
                // ✅ Extrai o role do token para garantir coerência
                String role = jwtService.extractRole(jwt);

                // Usa as authorities do próprio usuário (role)
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                user.getAuthorities() // já retorna as roles do User
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Coloca o usuário autenticado no contexto do Spring Security
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}


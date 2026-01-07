package com.parfunimports.backend.security;

import com.parfunimports.backend.model.Role;
import com.parfunimports.backend.model.User;
import com.parfunimports.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

/**
 * Filtro JWT que intercepta requisições, valida o token e popula o SecurityContext.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // ✅ Ignora rotas públicas (não exige token)
        if (path.startsWith("/api/products")
                || path.startsWith("/api/auth")
                || path.equals("/error")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                // Extrai email e role do token
                String email = jwtUtil.extractEmail(token);
                Role roleFromToken = jwtUtil.extractRole(token);

                // Valida token e busca usuário no banco
                if (jwtUtil.validateToken(token, email)) {
                    Optional<User> userOpt = userRepository.findByEmail(email);
                    if (userOpt.isPresent()) {
                        User user = userOpt.get();

                        // ✅ valida se role do token bate com role do banco
                        if (user.getRole() != roleFromToken) {
                            SecurityContextHolder.clearContext();
                            filterChain.doFilter(request, response);
                            return;
                        }

                        // ✅ Cria CustomUserPrincipal com authorities corretas
                        CustomUserPrincipal principal = CustomUserPrincipal.fromEntity(user);

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        principal,
                                        null,
                                        principal.getAuthorities()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );

                        // ✅ Registra autenticação no contexto de segurança
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }

            } catch (Exception e) {
                // Em caso de erro, limpa o contexto para evitar autenticação inválida
                SecurityContextHolder.clearContext();
            }
        }

        // Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}

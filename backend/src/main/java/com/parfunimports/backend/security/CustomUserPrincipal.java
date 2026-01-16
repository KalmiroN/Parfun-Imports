package com.parfunimports.backend.security;

import com.parfunimports.backend.model.Role;
import com.parfunimports.backend.model.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Representa o usuário autenticado no contexto de segurança.
 * É colocado no SecurityContextHolder pelo JwtAuthenticationFilter.
 */
@Getter
public class CustomUserPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final String password;
    private final Role role;

    public CustomUserPrincipal(Long id, String email, String password, Role role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // 🔧 Construtor auxiliar para converter diretamente de User (entidade JPA)
    public static CustomUserPrincipal fromEntity(User user) {
        return new CustomUserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // ✅ Prefixa sempre com ROLE_ para compatibilidade com Spring Security
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password; // usado pelo Spring Security na autenticação
    }

    @Override
    public String getUsername() {
        return email; // usado como identificador único
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // pode customizar se quiser expiração de conta
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // pode customizar se quiser bloqueio de conta
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // pode customizar se quiser expiração de credenciais
    }

    @Override
    public boolean isEnabled() {
        return true; // pode customizar se quiser desativar usuários
    }

    // Métodos auxiliares para facilitar acesso no controller
    public String getRoleName() {
        return role != null ? role.name() : "CLIENTE";
    }
}

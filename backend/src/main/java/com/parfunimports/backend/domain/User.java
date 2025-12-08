package com.parfunimports.backend.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import java.util.Collection;
import java.util.Collections;

/**
 * Entidade User que representa os usuários da aplicação.
 * Implementa UserDetails para integração com Spring Security.
 */
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // =========================
    // Getters e Setters
    // =========================
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {   
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // =========================
    // Métodos exigidos por UserDetails
    // =========================
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring Security exige prefixo "ROLE_" para diferenciar permissões
        return Collections.singleton(() -> "ROLE_" + role.name());
    }

    @Override
    public String getUsername() {
        // usamos email como identificador único
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // conta nunca expira
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // conta nunca é bloqueada
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // credenciais nunca expiram
    }

    @Override
    public boolean isEnabled() {
        return true; // usuário sempre habilitado
    }
}

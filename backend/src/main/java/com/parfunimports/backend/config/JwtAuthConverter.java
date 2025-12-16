package com.parfunimports.backend.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Converte claims do JWT (permissions, roles e scopes) em authorities do Spring Security.
 */
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtAuthenticationConverter delegate;

    public JwtAuthConverter() {
        JwtGrantedAuthoritiesConverter baseConverter = new JwtGrantedAuthoritiesConverter();
        baseConverter.setAuthorityPrefix(""); // não adiciona "SCOPE_"

        this.delegate = new JwtAuthenticationConverter();
        this.delegate.setJwtGrantedAuthoritiesConverter(jwt -> {
            List<GrantedAuthority> authorities = new ArrayList<>();

            // 1. Pega permissões do Auth0 RBAC (claim "permissions")
            List<String> permissions = jwt.getClaimAsStringList("permissions");
            if (permissions != null) {
                authorities.addAll(
                    permissions.stream()
                        .map(this::mapPermissionToAuthority)
                        .collect(Collectors.toList())
                );
            }

            // 2. Pega roles customizadas (claim custom "https://parfun-imports.com/roles")
            List<String> roles = jwt.getClaimAsStringList("https://parfun-imports.com/roles");
            if (roles != null) {
                authorities.addAll(
                    roles.stream()
                        .map(role -> (GrantedAuthority) () -> "ROLE_" + role.toUpperCase())
                        .collect(Collectors.toList())
                );
            }

            // 3. Fallback: pega escopos padrão (claim "scope")
            String scopeClaim = jwt.getClaimAsString("scope");
            if (scopeClaim != null) {
                authorities.addAll(
                    Arrays.stream(scopeClaim.split(" "))
                        .map(scope -> (GrantedAuthority) () -> scope)
                        .collect(Collectors.toList())
                );
            }

            return authorities;
        });
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        return delegate.convert(jwt);
    }

    /**
     * Mapeia permissões específicas para roles conhecidas.
     * Caso contrário, gera ROLE_<PERMISSION>.
     */
    private GrantedAuthority mapPermissionToAuthority(String permission) {
        switch (permission) {
            case "read:products":
                return (GrantedAuthority) () -> "ROLE_USER";
            case "create:products":
            case "delete:orders":
                return (GrantedAuthority) () -> "ROLE_ADMIN";
            default:
                return (GrantedAuthority) () -> "ROLE_" + permission.toUpperCase();
        }
    }
}

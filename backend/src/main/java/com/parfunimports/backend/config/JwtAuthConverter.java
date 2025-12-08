package com.parfunimports.backend.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Converte a claim "permissions" do JWT em authorities do Spring Security.
 */
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtAuthenticationConverter delegate;

    public JwtAuthConverter() {
        JwtGrantedAuthoritiesConverter permissionsConverter = new JwtGrantedAuthoritiesConverter();
        permissionsConverter.setAuthoritiesClaimName("permissions"); // usa a claim "permissions"
        permissionsConverter.setAuthorityPrefix(""); // não adiciona prefixo "SCOPE_"

        this.delegate = new JwtAuthenticationConverter();
        this.delegate.setJwtGrantedAuthoritiesConverter(jwt -> {
            List<String> permissions = jwt.getClaimAsStringList("permissions");
            if (permissions == null) {
                return List.of();
            }
            return permissions.stream()
                    .map(this::mapPermissionToAuthority)
                    .collect(Collectors.toList());
        });
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        return delegate.convert(jwt);
    }

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

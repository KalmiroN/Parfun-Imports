package com.parfunimports.backend.config;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

/**
 * Validador customizado para verificar se o JWT contém o audience esperado.
 * Pode validar um ou mais audiences configurados.
 */
public class AudienceValidator implements OAuth2TokenValidator<Jwt> {

    private final List<String> expectedAudiences;

    public AudienceValidator(List<String> expectedAudiences) {
        this.expectedAudiences = expectedAudiences;
    }

    @Override
    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        List<String> tokenAudiences = jwt.getAudience();

        if (tokenAudiences == null || tokenAudiences.isEmpty()) {
            OAuth2Error error = new OAuth2Error(
                    "invalid_token",
                    "O token JWT não possui claim 'audience'.",
                    null
            );
            return OAuth2TokenValidatorResult.failure(error);
        }

        for (String expected : expectedAudiences) {
            if (tokenAudiences.contains(expected)) {
                return OAuth2TokenValidatorResult.success();
            }
        }

        OAuth2Error error = new OAuth2Error(
                "invalid_token",
                "O token JWT não contém nenhum dos audiences esperados: " + expectedAudiences,
                null
        );
        return OAuth2TokenValidatorResult.failure(error);
    }
}
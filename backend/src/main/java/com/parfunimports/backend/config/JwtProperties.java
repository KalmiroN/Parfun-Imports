package com.parfunimports.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Classe de configuração que mapeia as propriedades do Auth0
 * definidas no application.properties (prefixo "auth0").
 *
 * Exemplo no application.properties:
 * auth0.domain=dev-w4m4ego8rxl0jjzq.us.auth0.com
 * auth0.clientId=KmRuw4lo6QGVTSkcozRtxVzlQFLch2o8
 * auth0.clientSecret=${AUTH0_CLIENT_SECRET}
 * auth0.audience=http://localhost:8080/api
 */
@Component
@ConfigurationProperties(prefix = "auth0")
public class JwtProperties {

    private String domain;
    private String clientId;
    private String clientSecret;
    private String audience;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }
}

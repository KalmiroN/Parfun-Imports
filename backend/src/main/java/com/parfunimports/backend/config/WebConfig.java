package com.parfunimports.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // todas as rotas da API
                .allowedOrigins("http://localhost:5174") // origem do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos permitidos
                .allowedHeaders("*") // todos os headers
                .allowCredentials(true); // permite cookies/autenticação se necessário
    }
}

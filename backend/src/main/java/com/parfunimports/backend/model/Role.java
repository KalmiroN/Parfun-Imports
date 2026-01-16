package com.parfunimports.backend.model;

/**
 * Enum que define os papéis (roles) de usuário no sistema.
 * - ADMIN: possui privilégios administrativos.
 * - CLIENTE: usuário padrão, cliente da aplicação.
 *
 * ⚠️ Importante: os valores devem estar em maiúsculo,
 * pois são usados diretamente nos tokens JWT e no Spring Security.
 */
public enum Role {
    ADMIN,
    CLIENTE
}

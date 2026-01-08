package com.parfunimports.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO usado para receber requisições de "Salvar para depois".
 * Evita expor diretamente a entidade JPA.
 */
@Data
public class SaveLaterItemRequest {

    private Long productId;
    private Integer quantity;
    private String imageUrl;
    private String name;
    private BigDecimal price;
    private String userEmail;
}
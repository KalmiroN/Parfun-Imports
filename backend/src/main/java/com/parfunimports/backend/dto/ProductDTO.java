package com.parfunimports.backend.dto;

import java.math.BigDecimal;

/**
 * DTO para produtos.
 * - name: nome comercial bonito (ex.: "Lattafa Asad")
 * - imageUrl: nome do arquivo físico da imagem (ex.: "Lattafa-Asad.png")
 */
public record ProductDTO(
        Long id,
        String name,
        String description,
        String imageUrl,
        BigDecimal price,
        Integer stock,
        boolean highlight
) {}

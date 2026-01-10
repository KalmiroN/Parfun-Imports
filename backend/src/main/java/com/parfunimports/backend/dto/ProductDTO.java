package com.parfunimports.backend.dto;

import java.math.BigDecimal;

/**
 * DTO para produtos.
 * - name: nome comercial (ex.: "Lattafa Asad")
 * - imageUrl: nome do arquivo físico da imagem (ex.: "/images/Lattafa-Asad.png")
 * - highlight: indica se o produto aparece em destaque na Home
 * - separa a entidade Product da resposta enviada ao frontend
 */
public record ProductDTO(
        Long id,
        String name,
        String description,
        String imageUrl,
        BigDecimal price,
        Integer stock,
        boolean highlight,
        String category // ✅ incluí categoria para manter alinhado com a entidade
) {}

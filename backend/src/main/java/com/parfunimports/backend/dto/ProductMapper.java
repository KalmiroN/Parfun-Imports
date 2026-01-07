package com.parfunimports.backend.dto;

import com.parfunimports.backend.model.Product;
import org.springframework.stereotype.Component;

/**
 * Mapper para converter Product -> ProductDTO.
 * Garante que o backend nunca exponha diretamente a entidade Product.
 */
@Component
public class ProductMapper {

    public ProductDTO fromEntity(Product product) {
        if (product == null) return null;

        return new ProductDTO(
                product.getId(),
                product.getName(),        // ✅ nome comercial
                product.getDescription(),
                product.getImageUrl(),    // ✅ nome do arquivo físico .png
                product.getPrice(),
                product.getStock(),
                product.isHighlight()
        );
    }
}
package com.parfunimports.backend.dto;

import com.parfunimports.backend.model.Product;
import org.springframework.stereotype.Component;

/**
 * Mapper para converter Product -> ProductDTO.
 */
@Component
public class ProductMapper {

    public ProductDTO fromEntity(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),        // ✅ nome comercial bonito
                product.getDescription(),
                product.getImageUrl(),    // ✅ nome do arquivo físico .png
                product.getPrice(),
                product.getStock(),
                product.isHighlight()
        );
    }
}

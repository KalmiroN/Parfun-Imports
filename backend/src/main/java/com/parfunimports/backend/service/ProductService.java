package com.parfunimports.backend.service;

import com.parfunimports.backend.domain.Product;
import com.parfunimports.backend.exception.ProductNotFoundException;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Listar todos os produtos
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    // Buscar produto por ID
    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    // Criar novo produto (com validação)
    public Product createProduct(Product product) {
        if (product.getName() == null || product.getName().isBlank()) {
            throw new IllegalArgumentException("Nome do produto não pode ser vazio");
        }
        if (product.getPrice() == null) {
            throw new IllegalArgumentException("Preço do produto não pode ser nulo");
        }
        return productRepository.save(product);
    }

    // Atualizar produto existente (com validação)
    public Product updateProduct(Long id, Product product) {
        return productRepository.findById(id)
                .map(existing -> {
                    if (product.getName() == null || product.getName().isBlank()) {
                        throw new IllegalArgumentException("Nome do produto não pode ser vazio");
                    }
                    if (product.getPrice() == null) {
                        throw new IllegalArgumentException("Preço do produto não pode ser nulo");
                    }
                    existing.setName(product.getName());
                    existing.setDescription(product.getDescription());
                    existing.setPrice(product.getPrice());
                    existing.setStock(product.getStock());
                    return productRepository.save(existing);
                })
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    // Deletar produto
    public boolean deleteProduct(Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return true;
                })
                .orElseThrow(() -> new ProductNotFoundException(id));
    }
}

package com.parfunimports.backend.service;

import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 📦 Listar todos os produtos
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 🔎 Buscar produto por ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // ➕ Criar novo produto
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 📥 Criar vários produtos de uma vez
    public List<Product> saveAllProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    // ✏️ Atualizar produto existente
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setStock(updatedProduct.getStock());
                    product.setHighlight(updatedProduct.isHighlight());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    return productRepository.save(product);
                })
                .orElse(null);
    }

    // ❌ Deletar produto
    public boolean deleteProduct(Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return true;
                })
                .orElse(false);
    }

    // ⭐ Listar apenas produtos em destaque
    public List<Product> getHighlightProducts() {
        return productRepository.findByHighlightTrue();
    }
}

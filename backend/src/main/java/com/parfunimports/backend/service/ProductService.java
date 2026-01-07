package com.parfunimports.backend.service;

import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Normaliza o campo imageUrl para nunca salvar com http://localhost:8080
    private String normalizeImageUrl(String imageUrl) {
        if (imageUrl == null) return null;

        // Remove qualquer prefixo http://localhost:8080 ou similar
        if (imageUrl.startsWith("http://localhost:8080")) {
            imageUrl = imageUrl.replace("http://localhost:8080", "");
        }

        // Garante que termina com .png
        if (!imageUrl.toLowerCase().endsWith(".png")) {
            throw new IllegalArgumentException("Somente arquivos .PNG são permitidos.");
        }

        // Remove barras duplicadas no início
        return imageUrl.replaceAll("^/+", "/");
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
    @Transactional
    public Product saveProduct(Product product) {
        product.setImageUrl(normalizeImageUrl(product.getImageUrl())); // ✅ normaliza antes de salvar
        return productRepository.save(product);
    }

    // 📥 Criar vários produtos de uma vez
    @Transactional
    public List<Product> saveAllProducts(List<Product> products) {
        products.forEach(p -> p.setImageUrl(normalizeImageUrl(p.getImageUrl()))); // ✅ normaliza todos
        return productRepository.saveAll(products);
    }

    // ✏️ Atualizar produto existente
    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        updatedProduct.setImageUrl(normalizeImageUrl(updatedProduct.getImageUrl())); // ✅ normaliza antes de atualizar
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
    @Transactional
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

    // 🔎 Buscar produtos por nome (case insensitive)
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // 💰 Buscar produtos até determinado preço
    public List<Product> searchProductsByPrice(Double maxPrice) {
        return productRepository.findByPriceLessThanEqual(maxPrice);
    }

    // 📦 Listar apenas produtos disponíveis em estoque
    public List<Product> getAvailableProducts() {
        return productRepository.findByStockGreaterThan(0);
    }

    // 📊 Top produtos mais vendidos (com quantidade)
    public List<Object[]> getTopSellingProductsWithQuantity() {
        return productRepository.findTopSellingProductsWithQuantity();
    }

    // 📊 Somar estoque total
    public Integer getTotalStock() {
        return productRepository.sumTotalStock();
    }

    // 🔎 Buscar produtos por categoria
    public List<Product> searchProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // 🔎 Buscar produtos por faixa de preço
    public List<Product> searchProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
}

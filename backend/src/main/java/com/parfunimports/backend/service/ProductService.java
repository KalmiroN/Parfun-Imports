package com.parfunimports.backend.service;

import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Normaliza o campo imageUrl para nunca salvar com http://localhost:8080
    private String normalizeImageUrl(String imageUrl) {
        if (imageUrl == null) return null;

        if (imageUrl.startsWith("http://localhost:8080")) {
            imageUrl = imageUrl.replace("http://localhost:8080", "");
        }

        if (!imageUrl.toLowerCase().endsWith(".png")) {
            throw new IllegalArgumentException("Somente arquivos .PNG são permitidos.");
        }

        return imageUrl.replaceAll("^/+", "/");
    }

    // ✅ Método utilitário para deduplicar produtos por ID
    private List<Product> deduplicateProducts(List<Product> products) {
        return products.stream()
                .filter(p -> p.getId() != null
                          && p.getName() != null && !p.getName().isBlank()
                          && p.getImageUrl() != null && !p.getImageUrl().isBlank())
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(Product::getId, p -> p, (p1, p2) -> p1),
                        map -> new ArrayList<>(map.values())
                ));
    }

    // 📦 Listar todos os produtos (apenas válidos e únicos)
    public List<Product> getAllProducts() {
        return deduplicateProducts(productRepository.findAllDistinct());
    }

    // 🔎 Buscar produto por ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // ➕ Criar novo produto
    @Transactional
    public Product saveProduct(Product product) {
        product.setImageUrl(normalizeImageUrl(product.getImageUrl()));
        return productRepository.save(product);
    }

    // 📥 Criar vários produtos de uma vez
    @Transactional
    public List<Product> saveAllProducts(List<Product> products) {
        products.forEach(p -> p.setImageUrl(normalizeImageUrl(p.getImageUrl())));
        return productRepository.saveAll(products);
    }

    // ✏️ Atualizar produto existente
    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        updatedProduct.setImageUrl(normalizeImageUrl(updatedProduct.getImageUrl()));
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setStock(updatedProduct.getStock());
                    product.setHighlight(updatedProduct.isHighlight());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    product.setCategory(updatedProduct.getCategory());
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

    // ⭐ Listar apenas produtos em destaque válidos e únicos
    public List<Product> getHighlightProducts() {
        return deduplicateProducts(productRepository.findDistinctByHighlightTrue());
    }

    // 🔎 Buscar produtos por nome (case insensitive)
    public List<Product> searchProductsByName(String name) {
        return deduplicateProducts(productRepository.findByNameContainingIgnoreCase(name));
    }

    // 💰 Buscar produtos até determinado preço
    public List<Product> searchProductsByPrice(Double maxPrice) {
        return deduplicateProducts(productRepository.findByPriceLessThanEqual(maxPrice));
    }

    // 📦 Listar apenas produtos disponíveis em estoque
    public List<Product> getAvailableProducts() {
        return deduplicateProducts(productRepository.findByStockGreaterThan(0));
    }

    // 📊 Top produtos mais vendidos (com quantidade) — agora com deduplicação
    public List<Object[]> getTopSellingProductsWithQuantity() {
        List<Object[]> rawResults = productRepository.findTopSellingProductsWithQuantity();

        Map<Long, Object[]> deduplicated = new LinkedHashMap<>();
        for (Object[] row : rawResults) {
            Product product = (Product) row[0];
            Long quantity = (Long) row[1];

            if (product != null && product.getId() != null) {
                // Se já existir, mantém o primeiro (ou poderia somar quantidades, se necessário)
                deduplicated.putIfAbsent(product.getId(), new Object[]{product, quantity});
            }
        }

        return new ArrayList<>(deduplicated.values());
    }

    // 📊 Somar estoque total
    public Integer getTotalStock() {
        return productRepository.sumTotalStock();
    }

    // 🔎 Buscar produtos por categoria
    public List<Product> searchProductsByCategory(String category) {
        return deduplicateProducts(productRepository.findByCategoryIgnoreCase(category));
    }

    // 🔎 Buscar produtos por faixa de preço
    public List<Product> searchProductsByPriceRange(Double minPrice, Double maxPrice) {
        return deduplicateProducts(productRepository.findByPriceBetween(minPrice, maxPrice));
    }
}

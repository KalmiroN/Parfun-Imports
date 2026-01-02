package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.ProductDTO;
import com.parfunimports.backend.dto.ProductMapper;
import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para gerenciar os endpoints de produtos.
 * Retorna sempre ProductDTO para separar nome comercial (name)
 * do nome do arquivo físico da imagem (imageUrl).
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
    }

    // 📦 Listar todos os produtos
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDTO> dtos = products.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // 🔎 Buscar produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return (product != null)
                ? ResponseEntity.ok(productMapper.fromEntity(product))
                : ResponseEntity.notFound().build();
    }

    // ➕ Criar novo produto
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody Product product) {
        Product saved = productService.saveProduct(product);
        return ResponseEntity.ok(productMapper.fromEntity(saved));
    }

    // 📥 Criar vários produtos de uma vez
    @PostMapping("/batch")
    public ResponseEntity<List<ProductDTO>> createProducts(@Valid @RequestBody List<Product> products) {
        List<Product> saved = productService.saveAllProducts(products);
        List<ProductDTO> dtos = saved.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // ✏️ Atualizar produto existente
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
                                                    @Valid @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        return (product != null)
                ? ResponseEntity.ok(productMapper.fromEntity(product))
                : ResponseEntity.notFound().build();
    }

    // ❌ Deletar produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // ⭐ Listar produtos em destaque
    @GetMapping("/highlights")
    public ResponseEntity<List<ProductDTO>> getHighlightProducts() {
        List<Product> products = productService.getHighlightProducts();
        List<ProductDTO> dtos = products.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // 🔎 Buscar produtos por nome
    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProductsByName(@RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        List<ProductDTO> dtos = products.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // 💰 Buscar produtos até determinado preço
    @GetMapping("/price")
    public ResponseEntity<List<ProductDTO>> searchProductsByPrice(@RequestParam Double maxPrice) {
        List<Product> products = productService.searchProductsByPrice(maxPrice);
        List<ProductDTO> dtos = products.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    // 📦 Listar apenas produtos disponíveis em estoque
    @GetMapping("/available")
    public ResponseEntity<List<ProductDTO>> getAvailableProducts() {
        List<Product> products = productService.getAvailableProducts();
        List<ProductDTO> dtos = products.stream()
                .map(productMapper::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }
}

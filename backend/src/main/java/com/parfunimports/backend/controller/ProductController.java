package com.parfunimports.backend.controller;

import com.parfunimports.backend.domain.Product;
import com.parfunimports.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para endpoints relacionados a produtos (Product).
 * Protegido por permissions via Spring Security integrado ao Auth0.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Listar todos os produtos (precisa da permission "read:products")
    @GetMapping
    @PreAuthorize("hasAuthority('read:products')")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    // Buscar produto por ID (precisa da permission "read:products")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('read:products')")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.findById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    // Criar novo produto (precisa da permission "create:products")
    @PostMapping
    @PreAuthorize("hasAuthority('create:products')")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.createProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    // Atualizar produto existente (precisa da permission "create:products")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('create:products')")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return updatedProduct != null ? ResponseEntity.ok(updatedProduct) : ResponseEntity.notFound().build();
    }

    // Deletar produto (precisa da permission "delete:orders")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:orders')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}

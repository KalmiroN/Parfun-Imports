package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.CartItem;
import com.parfunimports.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ➕ Adicionar item
    @PostMapping
    public ResponseEntity<CartItem> addItem(@Valid @RequestBody CartItem item) {
        CartItem saved = cartService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 📦 Listar itens
    @GetMapping("/{email}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable String email) {
        return ResponseEntity.ok(cartService.getCartItems(email));
    }

    // ❌ Remover item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.noContent().build();
    }

    // 🗑️ Limpar carrinho
    @DeleteMapping("/user/{email}")
    public ResponseEntity<Void> clearCart(@PathVariable String email) {
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }

    // 🔄 Atualizar quantidade de um item
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQuantity(
            @PathVariable Long id,
            @RequestBody CartItem item
    ) {
        CartItem updated = cartService.updateQuantity(id, item.getQuantity());
        return ResponseEntity.ok(updated);
    }
}

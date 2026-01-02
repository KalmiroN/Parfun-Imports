package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.CartItem;
import com.parfunimports.backend.security.CustomUserPrincipal;
import com.parfunimports.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ➕ Adicionar item ao carrinho do usuário logado
    @PostMapping
    public ResponseEntity<CartItem> addItem(@AuthenticationPrincipal CustomUserPrincipal principal,
                                            @Valid @RequestBody CartItem item) {
        item.setUserEmail(principal.getEmail()); // ✅ força email do usuário logado
        CartItem saved = cartService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 📦 Listar itens do carrinho do usuário logado
    @GetMapping("/my")
    public ResponseEntity<List<CartItem>> getMyCart(@AuthenticationPrincipal CustomUserPrincipal principal) {
        return ResponseEntity.ok(cartService.getCartItems(principal.getEmail()));
    }

    // ❌ Remover item (só se pertence ao usuário logado)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@AuthenticationPrincipal CustomUserPrincipal principal,
                                           @PathVariable Long id) {
        boolean deleted = cartService.removeItem(id, principal.getEmail());
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // 🗑️ Limpar carrinho do usuário logado
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal CustomUserPrincipal principal) {
        cartService.clearCart(principal.getEmail());
        return ResponseEntity.noContent().build();
    }

    // 🔄 Atualizar quantidade de um item
    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateQuantity(@AuthenticationPrincipal CustomUserPrincipal principal,
                                                   @PathVariable Long id,
                                                   @RequestBody CartItem item) {
        CartItem updated = cartService.updateQuantity(id, item.getQuantity(), principal.getEmail());
        return ResponseEntity.ok(updated);
    }
}

package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.SaveLaterItemRequest;
import com.parfunimports.backend.model.SaveLaterItem;
import com.parfunimports.backend.service.SaveLaterService;
import com.parfunimports.backend.security.CustomUserPrincipal;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savelater")
public class SaveLaterController {

    private final SaveLaterService saveLaterService;

    public SaveLaterController(SaveLaterService saveLaterService) {
        this.saveLaterService = saveLaterService;
    }

    // ➕ Adicionar item (usando DTO em vez da entidade)
    @PostMapping
    public ResponseEntity<SaveLaterItem> saveItem(@Valid @RequestBody SaveLaterItemRequest request,
                                                  @AuthenticationPrincipal CustomUserPrincipal user) {
        SaveLaterItem saved = saveLaterService.saveItem(request, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 📦 Listar itens do usuário autenticado
    @GetMapping("/my")
    public ResponseEntity<List<SaveLaterItem>> getMySavedItems(@AuthenticationPrincipal CustomUserPrincipal user) {
        return ResponseEntity.ok(saveLaterService.getSavedItems(user.getEmail()));
    }

    // ❌ Remover item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeSavedItem(@PathVariable Long id,
                                                @AuthenticationPrincipal CustomUserPrincipal user) {
        saveLaterService.removeSavedItem(user.getEmail(), id);
        return ResponseEntity.noContent().build();
    }

    // 🗑️ Limpar lista do usuário autenticado
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearMySavedItems(@AuthenticationPrincipal CustomUserPrincipal user) {
        saveLaterService.clearSavedItems(user.getEmail());
        return ResponseEntity.noContent().build();
    }
}
package com.parfunimports.backend.controller;

import com.parfunimports.backend.model.SaveLaterItem;
import com.parfunimports.backend.service.SaveLaterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savelater")
public class SaveLaterController {

    private final SaveLaterService saveLaterService;

    public SaveLaterController(SaveLaterService saveLaterService) {
        this.saveLaterService = saveLaterService;
    }

    // ➕ Adicionar item
    @PostMapping
    public ResponseEntity<SaveLaterItem> saveItem(@Valid @RequestBody SaveLaterItem item) {
        SaveLaterItem saved = saveLaterService.saveItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // 📦 Listar itens
    @GetMapping("/{email}")
    public ResponseEntity<List<SaveLaterItem>> getSavedItems(@PathVariable String email) {
        return ResponseEntity.ok(saveLaterService.getSavedItems(email));
    }

    // ❌ Remover item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeSavedItem(@PathVariable Long id) {
        saveLaterService.removeSavedItem(id);
        return ResponseEntity.noContent().build();
    }

    // 🗑️ Limpar lista
    @DeleteMapping("/user/{email}")
    public ResponseEntity<Void> clearSavedItems(@PathVariable String email) {
        saveLaterService.clearSavedItems(email);
        return ResponseEntity.noContent().build();
    }
}

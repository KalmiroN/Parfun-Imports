package com.parfunimports.backend.service;

import com.parfunimports.backend.dto.SaveLaterItemRequest;
import com.parfunimports.backend.model.SaveLaterItem;
import com.parfunimports.backend.repository.SaveLaterRepository;
import com.parfunimports.backend.security.CustomUserPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaveLaterService {

    private final SaveLaterRepository saveLaterRepository;

    public SaveLaterService(SaveLaterRepository saveLaterRepository) {
        this.saveLaterRepository = saveLaterRepository;
    }

    // ➕ Adicionar item à lista "Salvar para depois" usando DTO
    public SaveLaterItem saveItem(SaveLaterItemRequest request, CustomUserPrincipal user) {
        return saveLaterRepository.findByUserEmailAndProductId(user.getEmail(), request.getProductId())
            .map(existing -> {
                // Atualiza a quantidade acumulando
                existing.setQuantity(existing.getQuantity() + request.getQuantity());

                // Atualiza também os outros campos (nome, preço, imagem) caso tenham mudado
                existing.setName(request.getName());
                existing.setPrice(request.getPrice());
                existing.setImageUrl(request.getImageUrl());

                return saveLaterRepository.save(existing);
            })
            .orElseGet(() -> {
                SaveLaterItem newItem = SaveLaterItem.builder()
                        .userId(user.getId())
                        .userEmail(user.getEmail())
                        .productId(request.getProductId())
                        .name(request.getName())
                        .imageUrl(request.getImageUrl())
                        .quantity(request.getQuantity())
                        .price(request.getPrice())
                        .build();
                return saveLaterRepository.save(newItem);
            });
    }

    // 📦 Listar itens salvos de um usuário
    public List<SaveLaterItem> getSavedItems(String userEmail) {
        return saveLaterRepository.findByUserEmail(userEmail);
    }

    // ❌ Remover item salvo (garantindo que pertence ao usuário)
    public void removeSavedItem(String userEmail, Long id) {
        saveLaterRepository.findByIdAndUserEmail(id, userEmail)
            .ifPresentOrElse(
                saveLaterRepository::delete,
                () -> { throw new IllegalArgumentException("Item não encontrado ou não pertence ao usuário: " + id); }
            );
    }

    // 🗑️ Limpar todos os itens salvos de um usuário
    public void clearSavedItems(String userEmail) {
        List<SaveLaterItem> items = saveLaterRepository.findByUserEmail(userEmail);
        if (items.isEmpty()) {
            throw new IllegalStateException("A lista de salvar para depois já está vazia para o usuário: " + userEmail);
        }
        saveLaterRepository.deleteByUserEmail(userEmail);
    }
}
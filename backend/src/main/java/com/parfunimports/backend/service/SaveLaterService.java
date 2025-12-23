package com.parfunimports.backend.service;

import com.parfunimports.backend.model.SaveLaterItem;
import com.parfunimports.backend.repository.SaveLaterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaveLaterService {

    private final SaveLaterRepository saveLaterRepository;

    public SaveLaterService(SaveLaterRepository saveLaterRepository) {
        this.saveLaterRepository = saveLaterRepository;
    }

    // ➕ Adicionar item à lista "Salvar para depois"
    public SaveLaterItem saveItem(SaveLaterItem item) {
        // Verifica se já existe o mesmo produto para o mesmo usuário
        SaveLaterItem existing = saveLaterRepository.findByUserEmailAndProductId(
                item.getUserEmail(), item.getProductId()
        );

        if (existing != null) {
            // Atualiza a quantidade acumulando
            existing.setQuantity(existing.getQuantity() + item.getQuantity());

            // Atualiza também os outros campos (nome, preço, imagem) caso tenham mudado
            existing.setName(item.getName());
            existing.setPrice(item.getPrice());
            existing.setImageUrl(item.getImageUrl());

            return saveLaterRepository.save(existing);
        }

        // Se não existe, salva novo item
        return saveLaterRepository.save(item);
    }

    // 📦 Listar itens salvos de um usuário
    public List<SaveLaterItem> getSavedItems(String userEmail) {
        return saveLaterRepository.findByUserEmail(userEmail);
    }

    // ❌ Remover item salvo
    public void removeSavedItem(Long id) {
        if (saveLaterRepository.existsById(id)) {
            saveLaterRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Item não encontrado para remoção: " + id);
        }
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

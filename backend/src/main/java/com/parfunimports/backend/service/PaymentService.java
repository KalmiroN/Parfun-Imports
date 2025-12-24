package com.parfunimports.backend.service;

import com.parfunimports.backend.dto.CartItemDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    // ⚠️ Simulação: em produção, buscar configs do banco (AdminController/Settings)
    private boolean pixActive = true;
    private double pixDiscount = 5.0; // desconto fixo de exemplo
    private boolean cardActive = true;

    // ✅ Calcular total dos itens
    public double calculateTotal(List<CartItemDTO> items) {
        double sum = 0.0;
        if (items != null) {
            for (CartItemDTO item : items) {
                try {
                    sum += item.getPrice() * item.getQuantity();
                } catch (Exception e) {
                    // ignora item inválido
                }
            }
        }
        return sum;
    }

    // ✅ Processar pagamento via Pix
    public Map<String, Object> processPix(List<CartItemDTO> items) {
        double total = calculateTotal(items);
        double discountApplied = pixActive ? pixDiscount : 0.0;
        double finalTotal = total - discountApplied;

        return Map.of(
                "method", "pix",
                "status", "pending",
                "message", "Pagamento via Pix iniciado. Aguarde confirmação.",
                "total", finalTotal,
                "discountApplied", discountApplied,
                "pixQrCode", "00020126580014BR.GOV.BCB.PIX0136abcd1234efgh5678ijkl9012mnop5204000053039865406100.005802BR5920Parfun Imports6009Sao Paulo62140510abcd12345678"
        );
    }

    // ✅ Processar pagamento via Cartão
    public Map<String, Object> processCard(List<CartItemDTO> items) {
        double total = calculateTotal(items);

        return Map.of(
                "method", "card",
                "status", "approved",
                "message", "Pagamento com cartão aprovado!",
                "total", total,
                "transactionId", "TX-" + System.currentTimeMillis()
        );
    }

    // ✅ Configurações (em produção, integrar com AdminController/SettingsRepository)
    public void setPixActive(boolean active) {
        this.pixActive = active;
    }

    public void setPixDiscount(double discount) {
        this.pixDiscount = discount;
    }

    public void setCardActive(boolean active) {
        this.cardActive = active;
    }

    public boolean isPixActive() {
        return pixActive;
    }

    public double getPixDiscount() {
        return pixDiscount;
    }

    public boolean isCardActive() {
        return cardActive;
    }
}

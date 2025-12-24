package com.parfunimports.backend.controller;

import com.parfunimports.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminController {

    private final PaymentService paymentService;

    public AdminController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ✅ GET /api/admin/settings
    @GetMapping
    public ResponseEntity<Map<String, Object>> getSettings() {
        Map<String, Object> settings = Map.of(
                "pixActive", paymentService.isPixActive(),
                "pixDiscount", paymentService.getPixDiscount(),
                "cardActive", paymentService.isCardActive()
        );
        return ResponseEntity.ok(settings);
    }

    // ✅ PUT /api/admin/settings
    @PutMapping
    public ResponseEntity<Map<String, Object>> updateSettings(@RequestBody Map<String, Object> newSettings) {
        if (newSettings.containsKey("pixActive")) {
            paymentService.setPixActive(Boolean.parseBoolean(newSettings.get("pixActive").toString()));
        }
        if (newSettings.containsKey("pixDiscount")) {
            try {
                double discount = Double.parseDouble(newSettings.get("pixDiscount").toString());
                paymentService.setPixDiscount(discount);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(Map.of("error", "pixDiscount inválido"));
            }
        }
        if (newSettings.containsKey("cardActive")) {
            paymentService.setCardActive(Boolean.parseBoolean(newSettings.get("cardActive").toString()));
        }

        Map<String, Object> updated = Map.of(
                "pixActive", paymentService.isPixActive(),
                "pixDiscount", paymentService.getPixDiscount(),
                "cardActive", paymentService.isCardActive()
        );
        return ResponseEntity.ok(updated);
    }
}

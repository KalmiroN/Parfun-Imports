package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.CheckoutRequest;
import com.parfunimports.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ✅ Checkout via Pix
    @PostMapping("/pix")
    public ResponseEntity<Map<String, Object>> checkoutPix(@RequestBody CheckoutRequest request) {
        Map<String, Object> response = paymentService.processPix(request.getItems());
        return ResponseEntity.ok(response);
    }

    // ✅ Checkout via Cartão
    @PostMapping("/card")
    public ResponseEntity<Map<String, Object>> checkoutCard(@RequestBody CheckoutRequest request) {
        Map<String, Object> response = paymentService.processCard(request.getItems());
        return ResponseEntity.ok(response);
    }
}


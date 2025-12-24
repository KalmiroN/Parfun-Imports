package com.parfunimports.backend.dto;

import java.util.List;

public class CheckoutRequest {
    private String userEmail;
    private List<CartItemDTO> items;

    // Getters e Setters
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }
    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
}

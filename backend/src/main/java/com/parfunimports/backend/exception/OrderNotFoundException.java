package com.parfunimports.backend.exception;

public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(Long id) {
        super("Pedido não encontrado com ID: " + id);
    }

    public OrderNotFoundException(String message) {
        super(message);
    }
}


package com.parfunimports.backend.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para representar um pedido (Order).
 * Evita expor diretamente a entidade JPA.
 */
public class OrderDTO {

    private Long id;
    private String customerEmail;
    private BigDecimal total;
    private List<OrderProductDTO> items;

    public OrderDTO() {}

    public OrderDTO(Long id, String customerEmail, BigDecimal total, List<OrderProductDTO> items) {
        this.id = id;
        this.customerEmail = customerEmail;
        this.total = total;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public List<OrderProductDTO> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public void setItems(List<OrderProductDTO> items) {
        this.items = items;
    }
}

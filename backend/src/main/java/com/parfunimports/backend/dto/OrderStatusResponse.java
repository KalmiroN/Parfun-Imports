package com.parfunimports.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusResponse {
    private int pendingOrders;
    private int paidOrders;
    private int cancelledOrders;
}

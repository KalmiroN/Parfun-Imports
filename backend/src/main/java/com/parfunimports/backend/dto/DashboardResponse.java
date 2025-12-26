package com.parfunimports.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private int totalOrders;
    private double totalSales;
    private double avgTicket;
    private int totalProducts;

    // 📌 novos campos para status dos pedidos
    private int pendingOrders;
    private int paidOrders;
    private int cancelledOrders;

    private List<DailySales> weekly;
    private List<DailySales> fortnightly;
    private List<DailySales> currentMonth;
    private List<MonthlySales> monthly;
    private List<MonthlySales> annual;
    private List<TopProduct> topProducts;

    // 📌 Classes internas com Lombok
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DailySales {
        private String day;
        private double total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlySales {
        private String month;
        private double total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TopProduct {
        private String name;
        private int quantity;
    }
}




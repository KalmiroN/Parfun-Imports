package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.DashboardResponse;
import com.parfunimports.backend.dto.DashboardResponse.DailySales;
import com.parfunimports.backend.dto.DashboardResponse.MonthlySales;
import com.parfunimports.backend.dto.DashboardResponse.TopProduct;
import com.parfunimports.backend.dto.OrderStatusResponse;
import com.parfunimports.backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard") // 🔑 prefixo único para todos os endpoints
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 📌 Endpoint principal (retorna todos os indicadores)
    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getSalesDashboard();
    }

    // 📌 Endpoint antigo (mantido temporariamente para compatibilidade)
    @GetMapping("/legacy-sales")
    public DashboardResponse getDashboardSalesLegacy() {
        return dashboardService.getSalesDashboard();
    }

    // 📌 Endpoint para vendas diárias (mês vigente)
    @GetMapping("/sales/daily")
    public List<DailySales> getDailySales() {
        return dashboardService.getSalesDashboard().getCurrentMonth();
    }

    // 📌 Endpoint para vendas mensais (ano vigente)
    @GetMapping("/sales/monthly")
    public List<MonthlySales> getMonthlySales() {
        return dashboardService.getSalesDashboard().getAnnual();
    }

    // 📌 Endpoint para top produtos
    @GetMapping("/top-products")
    public List<TopProduct> getTopProducts() {
        return dashboardService.getSalesDashboard().getTopProducts();
    }

    // 📌 Endpoint para status dos pedidos
    @GetMapping("/status")
    public OrderStatusResponse getOrderStatus() {
        return dashboardService.getOrderStatus();
    }
}

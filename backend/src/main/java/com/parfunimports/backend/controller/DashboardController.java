package com.parfunimports.backend.controller;

import com.parfunimports.backend.dto.DashboardResponse;
import com.parfunimports.backend.dto.DashboardResponse.DailySales;
import com.parfunimports.backend.dto.DashboardResponse.MonthlySales;
import com.parfunimports.backend.dto.DashboardResponse.TopProduct;
import com.parfunimports.backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 📌 Endpoint principal (padrão regente)
    @GetMapping("/api/dashboard")
    public DashboardResponse getDashboard() {
        return dashboardService.getSalesDashboard();
    }

    // 📌 Endpoint antigo (mantido temporariamente para compatibilidade)
    @GetMapping("/dashboard/sales")
    public DashboardResponse getDashboardSales() {
        return dashboardService.getSalesDashboard();
    }

    // 📌 Endpoint para vendas diárias
    @GetMapping("/api/dashboard/sales/daily")
    public List<DailySales> getDailySales() {
        return dashboardService.getSalesDashboard().getCurrentMonth();
    }

    // 📌 Endpoint para vendas mensais
    @GetMapping("/api/dashboard/sales/monthly")
    public List<MonthlySales> getMonthlySales() {
        return dashboardService.getSalesDashboard().getAnnual();
    }

    // 📌 Endpoint para top produtos
    @GetMapping("/api/dashboard/top-products")
    public List<TopProduct> getTopProducts() {
        return dashboardService.getSalesDashboard().getTopProducts();
    }
}


package com.parfunimports.backend.service;

import com.parfunimports.backend.dto.DashboardResponse;
import com.parfunimports.backend.dto.DashboardResponse.DailySales;
import com.parfunimports.backend.dto.DashboardResponse.MonthlySales;
import com.parfunimports.backend.dto.DashboardResponse.TopProduct;
import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.OrderRepository;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public DashboardService(OrderRepository orderRepository,
                            ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public DashboardResponse getSalesDashboard() {
        DashboardResponse response = new DashboardResponse();

        // 📌 Indicadores principais
        long totalOrders = orderRepository.count();
        response.setTotalOrders((int) totalOrders);

        Double totalSales = orderRepository.sumTotalSalesBetween(
                LocalDate.now().withDayOfYear(1).atStartOfDay(),
                LocalDate.now().plusDays(1).atStartOfDay()
        );
        response.setTotalSales(totalSales != null ? totalSales : 0.0);

        double avgTicket = totalOrders == 0 ? 0 : response.getTotalSales() / totalOrders;
        response.setAvgTicket(avgTicket);

        Integer totalProducts = productRepository.sumTotalStock();
        response.setTotalProducts(totalProducts != null ? totalProducts : 0);

        // 📌 Status dos pedidos
        int pendingOrders = orderRepository.findByStatus("PENDING").size();
        int paidOrders = orderRepository.findByStatus("PAID").size();
        int cancelledOrders = orderRepository.findByStatus("CANCELLED").size();

        response.setPendingOrders(pendingOrders);
        response.setPaidOrders(paidOrders);
        response.setCancelledOrders(cancelledOrders);

        // 📌 Vendas do mês vigente (gráfico de linhas)
        int month = LocalDate.now().getMonthValue();
        int year = LocalDate.now().getYear();
        List<DailySales> currentMonthSales = orderRepository.sumSalesByDay(month, year)
                .stream()
                .map(obj -> createDaily(String.valueOf(obj[0]), ((Number) obj[1]).doubleValue()))
                .collect(Collectors.toList());
        response.setCurrentMonth(currentMonthSales);

        // 📌 Vendas anuais (gráfico de barras)
        List<MonthlySales> annualSales = orderRepository.sumSalesByMonth(year)
                .stream()
                .map(obj -> {
                    int monthNumber = ((Number) obj[0]).intValue();
                    String monthName = LocalDate.of(year, monthNumber, 1)
                            .getMonth()
                            .getDisplayName(TextStyle.FULL, new Locale("pt", "BR"));
                    return createMonthly(monthName, ((Number) obj[1]).doubleValue());
                })
                .collect(Collectors.toList());
        response.setAnnual(annualSales);

        // 📌 Top produtos (mais vendidos via OrderProduct)
        List<TopProduct> topProducts = productRepository.findTopSellingProductsWithQuantity()
                .stream()
                .limit(5)
                .map(obj -> {
                    Product product = (Product) obj[0];
                    Long totalSold = (Long) obj[1];
                    return createTop(product.getName(), totalSold.intValue());
                })
                .collect(Collectors.toList());
        response.setTopProducts(topProducts);

        return response;
    }

    private DailySales createDaily(String day, double total) {
        DailySales d = new DailySales();
        d.setDay(day);
        d.setTotal(total);
        return d;
    }

    private MonthlySales createMonthly(String month, double total) {
        MonthlySales m = new MonthlySales();
        m.setMonth(month);
        m.setTotal(total);
        return m;
    }

    private TopProduct createTop(String name, int quantity) {
        TopProduct t = new TopProduct();
        t.setName(name);
        t.setQuantity(quantity);
        return t;
    }
}


package com.parfunimports.backend.service;

import com.parfunimports.backend.dto.DashboardResponse;
import com.parfunimports.backend.dto.DashboardResponse.DailySales;
import com.parfunimports.backend.dto.DashboardResponse.MonthlySales;
import com.parfunimports.backend.dto.DashboardResponse.TopProduct;
import com.parfunimports.backend.dto.OrderStatusResponse;
import com.parfunimports.backend.model.Product;
import com.parfunimports.backend.repository.OrderRepository;
import com.parfunimports.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

        BigDecimal totalSalesBD = orderRepository.sumTotalSalesBetween(
                LocalDate.now().withDayOfYear(1).atStartOfDay(),
                LocalDate.now().plusDays(1).atStartOfDay()
        );

        BigDecimal totalSales = (totalSalesBD != null) ? totalSalesBD : BigDecimal.ZERO;
        response.setTotalSales(totalSales);

        BigDecimal avgTicket = (totalOrders == 0)
                ? BigDecimal.ZERO
                : totalSales.divide(BigDecimal.valueOf(totalOrders), 2, BigDecimal.ROUND_HALF_UP);
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
                .map(obj -> {
                    BigDecimal total = obj[1] != null ? (BigDecimal) obj[1] : BigDecimal.ZERO;
                    return createDaily(String.valueOf(obj[0]), total);
                })
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
                    BigDecimal total = obj[1] != null ? (BigDecimal) obj[1] : BigDecimal.ZERO;
                    return createMonthly(monthName, total);
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

    // 📌 Novo método para retornar apenas os status dos pedidos
    public OrderStatusResponse getOrderStatus() {
        int pendingOrders = orderRepository.findByStatus("PENDING").size();
        int paidOrders = orderRepository.findByStatus("PAID").size();
        int cancelledOrders = orderRepository.findByStatus("CANCELLED").size();

        return new OrderStatusResponse(pendingOrders, paidOrders, cancelledOrders);
    }

    private DailySales createDaily(String day, BigDecimal total) {
        DailySales d = new DailySales();
        d.setDay(day);
        d.setTotal(total);
        return d;
    }

    private MonthlySales createMonthly(String month, BigDecimal total) {
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

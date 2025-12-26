package com.parfunimports.backend.repository;

import com.parfunimports.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Buscar pedidos entre duas datas
    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    // Buscar pedidos por status
    List<Order> findByStatus(String status);

    // Somar total de vendas em um período
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    Double sumTotalSalesBetween(LocalDateTime start, LocalDateTime end);

    // Contar pedidos em um período
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    Long countOrdersBetween(LocalDateTime start, LocalDateTime end);

    // Agrupar vendas por dia (para gráfico do mês vigente)
    @Query("SELECT FUNCTION('DAY', o.createdAt), SUM(o.totalAmount) " +
           "FROM Order o WHERE FUNCTION('MONTH', o.createdAt) = :month AND FUNCTION('YEAR', o.createdAt) = :year " +
           "GROUP BY FUNCTION('DAY', o.createdAt) ORDER BY FUNCTION('DAY', o.createdAt)")
    List<Object[]> sumSalesByDay(int month, int year);

    // Agrupar vendas por mês (para gráfico anual)
    @Query("SELECT FUNCTION('MONTH', o.createdAt), SUM(o.totalAmount) " +
           "FROM Order o WHERE FUNCTION('YEAR', o.createdAt) = :year " +
           "GROUP BY FUNCTION('MONTH', o.createdAt) ORDER BY FUNCTION('MONTH', o.createdAt)")
    List<Object[]> sumSalesByMonth(int year);
}




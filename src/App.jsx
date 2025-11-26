import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { ThemeProvider } from "./context/themeProvider";

// Páginas
import Login from "./pages/login";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderConfirmation from "./pages/orderConfirmation";
import MyOrders from "./pages/myOrders";

// Admin
import AdminProducts from "./pages/admin/adminProducts";
import AdminOrders from "./pages/admin/adminOrders";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Login fora do Layout */}
          <Route path="/login" element={<Login />} />

          {/* Rotas principais com Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* Admin */}
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

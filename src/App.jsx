import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeProvider";

// Layout principal (já com Header + Footer)
import Layout from "./layouts/Layout";

// Páginas principais
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderConfirmation from "./pages/orderConfirmation";
import MyOrders from "./pages/myOrders";
import Login from "./pages/login";
import Register from "./pages/register";

// Novas páginas
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";
import Wishlist from "./pages/wishlist";
import Search from "./pages/search";

// Páginas administrativas
import AdminProducts from "./pages/admin/adminProducts";
import AdminOrders from "./pages/admin/adminOrders";

// Página de fallback
import NotFound from "./pages/notFound";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Login e Cadastro fora do Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas principais com Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* Novas rotas */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />

            {/* Admin */}
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* Fallback para rotas inexistentes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        {/* 🔎 Teste de Tema - aparece em todas as páginas */}
      </Router>
    </ThemeProvider>
  );
}

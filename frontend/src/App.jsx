import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeProvider";
import { CartProvider } from "./context/cartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Dashboard from "./pages/Dashboard"; // ✅ Import da nova página

// Páginas administrativas
import AdminProducts from "./pages/admin/adminProducts";
import AdminOrders from "./pages/admin/adminOrders";

// Página de fallback
import NotFound from "./pages/notFound";

// ✅ Import do ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Login e Cadastro fora do Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute redirectTo="/register">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute redirectTo="/register">
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            {/* Rotas principais com Layout (públicas) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<Search />} />

              {/* Admin (somente role=admin) */}
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute role="admin">
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute role="admin">
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          <ToastContainer position="bottom-right" autoClose={3000} />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import AuthProvider from "./context/auth/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layouts/layout";

// Páginas principais
import Home from "./pages/home";
import Products from "./pages/products"; // usado como "Catálogo"
import ProductDetail from "./pages/productDetail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import OrderConfirmation from "./pages/orderConfirmation";
import MyOrders from "./pages/myOrders";
import Login from "./pages/login";
import Register from "./pages/register";
import Logout from "./pages/Logout";
import LoggedOut from "./pages/LoggedOut";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";
import Wishlist from "./pages/wishlist";
import Search from "./pages/search";
import Dashboard from "./pages/dashboard";

// Páginas administrativas
import AdminProducts from "./pages/admin/adminProducts";
import AdminOrders from "./pages/admin/adminOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageRoles from "./pages/admin/ManageRoles";

// Página de fallback e acesso negado
import NotFound from "./pages/notFound";
import Unauthorized from "./pages/Unauthorized";
import AccessDenied from "./pages/AccessDenied";

// Proteção de rotas
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Rotas públicas restritas (apenas para não autenticados) */}
              <Route
                path="/login"
                element={
                  <PublicRoute redirectTo="/">
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute redirectTo="/">
                    <Register />
                  </PublicRoute>
                }
              />

              {/* Rotas públicas normais */}
              <Route path="/logout" element={<Logout />} />
              <Route path="/logged-out" element={<LoggedOut />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/access-denied" element={<AccessDenied />} />

              {/* Rotas protegidas (usuário autenticado) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute allowedRoles={["CLIENTE", "ADMIN"]}>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              {/* Rotas principais com Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />

                {/* Catálogo semântico */}
                <Route path="/catalogo" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* ✅ Perfil não redireciona para login se não autenticado */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute redirectOnUnauthenticated={false}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search" element={<Search />} />

                {/* Carrinho dentro do Layout */}
                <Route path="/cart" element={<Cart />} />

                {/* Rotas administrativas (apenas ADMIN) */}
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-roles"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                      <ManageRoles />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>

            {/* Toast global */}
            <ToastContainer position="bottom-right" autoClose={3000} />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

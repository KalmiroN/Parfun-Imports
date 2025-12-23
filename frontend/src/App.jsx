import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeProvider";
import { CartProvider } from "./context/cartProvider";
import { AuthProvider } from "./context/authProvider";
import { WishlistProvider } from "./context/wishlistProvider";
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
import Logout from "./pages/Logout";
import LoggedOut from "./pages/LoggedOut";
import ForgotPassword from "./pages/forgotPassword";
import Profile from "./pages/profile";
import Wishlist from "./pages/wishlist";
import Search from "./pages/search";
import Dashboard from "./pages/Dashboard";

// Páginas administrativas
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import ManageRoles from "./pages/admin/ManageRoles";

// Página de fallback e acesso negado
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AccessDenied from "./pages/AccessDenied";

// Proteção de rotas
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <Routes>
              {/* Rotas públicas restritas (apenas para não autenticados) */}
              <Route
                path="/login"
                element={
                  <PublicRoute redirectTo="/profile">
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute redirectTo="/profile">
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
                  <ProtectedRoute
                    allowedRoles={["client", "admin", "admin_secondary"]}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute
                    allowedRoles={["client", "admin", "admin_secondary"]}
                    redirectTo="/login"
                  >
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute
                    allowedRoles={["client", "admin", "admin_secondary"]}
                  >
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute
                    allowedRoles={["client", "admin", "admin_secondary"]}
                  >
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              {/* Rotas principais com Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search" element={<Search />} />

                {/* ✅ Corrigido: Carrinho dentro do Layout */}
                <Route path="/cart" element={<Cart />} />

                {/* Rotas administrativas */}
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "admin_secondary"]}>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "admin_secondary"]}>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/manage-roles"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
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
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

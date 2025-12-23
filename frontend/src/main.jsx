import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/theme.css";

import { BrowserRouter } from "react-router-dom"; // ✅ Router único
import { ThemeProvider } from "./context/themeProvider";
import { AuthProvider } from "./context/authProvider";
import { CartProvider } from "./context/cartProvider";
import { WishlistProvider } from "./context/wishlistProvider";
import ErrorBoundary from "./components/ErrorBoundary"; // ✅ captura erros

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

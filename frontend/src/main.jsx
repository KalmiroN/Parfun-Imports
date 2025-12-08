import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/theme.css";

import { ThemeProvider } from "./context/themeProvider";
import { CartProvider } from "./context/cartProvider";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN} // ✅ vem do .env
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} // ✅ vem do .env
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI, // ✅ vem do .env
        audience: import.meta.env.VITE_AUTH0_AUDIENCE, // ✅ vem do .env
      }}
      onRedirectCallback={() => {
        // ✅ redireciona após login/logout
        window.location.href =
          import.meta.env.VITE_AUTH0_POST_LOGOUT_REDIRECT_URI;
      }}
    >
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);

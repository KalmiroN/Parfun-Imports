// 🔑 Login
export async function loginRequest(email, password) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // envia objeto JSON com email e rawPassword
        body: JSON.stringify({
          email: email,
          rawPassword: password, // ✅ padronizado com o backend
        }),
      }
    );

    if (!response.ok) {
      // captura erro específico retornado pelo backend
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erro ${response.status}`);
    }

    // ✅ retorna objeto JSON completo (LoginResponse)
    return await response.json();
  } catch (err) {
    console.error("Erro no loginRequest:", err);
    throw new Error("Erro inesperado: " + err.message);
  }
}

// ➕ Registro
export async function registerRequest({
  email,
  password,
  name,
  phone,
  address,
}) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // envia objeto JSON com email e rawPassword
        body: JSON.stringify({
          email,
          rawPassword: password, // ✅ padronizado
          name,
          phone,
          address,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erro ${response.status}`);
    }

    // ✅ retorna objeto JSON completo (LoginResponse)
    return await response.json();
  } catch (err) {
    console.error("Erro no registerRequest:", err);
    throw new Error("Erro inesperado: " + err.message);
  }
}

// 🔄 Refresh token
export async function refreshRequest(refreshToken) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Erro ${response.status}`);
    }

    // ✅ retorna objeto JSON com novo accessToken e refreshToken
    return await response.json();
  } catch (err) {
    console.error("Erro no refreshRequest:", err);
    throw new Error("Erro inesperado: " + err.message);
  }
}

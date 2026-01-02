export function resolveImageUrl(value) {
  const fallback = "/images/default-product.png";
  if (!value) return fallback;

  try {
    const url = new URL(value);

    // Se vier do backend (localhost:8080) e for caminho de /images/, converte para relativo
    if (
      (url.host === "localhost:8080" || url.host === "127.0.0.1:8080") &&
      url.pathname.startsWith("/images/")
    ) {
      return url.pathname; // ex.: "/images/Lattafa-Asad.png"
    }

    // Se for uma URL externa (CDN, etc.), retorna como está
    return value;
  } catch {
    // Não era uma URL absoluta, segue fluxo normal
  }

  // Se já começar com /images/, retorna direto
  if (value.startsWith("/images/")) return value;

  // Se vier apenas o nome do arquivo, prefixa /images/
  if (/^[\w\-]+\.(png)$/i.test(value)) return `/images/${value}`;

  // Fallback
  return fallback;
}

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ✅ busca os produtos do backend Spring Boot
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return res.json();
      })
      .then((data) => {
        // ✅ deduplicação por ID
        const uniqueProducts = Array.from(
          new Map(data.map((p) => [p.id, p])).values()
        );
        setProducts(uniqueProducts);
      })
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          price={p.price}
          imageUrl={p.imageUrl}
        />
      ))}
    </div>
  );
}

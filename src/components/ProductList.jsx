import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { apiProductos } from "../Api.js";

export function ProductList({ min, max, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await apiProductos.get("/productos");
        console.log("RESPUESTA PRODUCTOS:", response.data);

        let data = Array.isArray(response.data)
          ? response.data
          : response.data.content || [];

        if (min !== null && min !== undefined && min !== "") {
          data = data.filter((p) => Number(p.precio) >= Number(min));
        }

        if (max !== null && max !== undefined && max !== "") {
          data = data.filter((p) => Number(p.precio) <= Number(max));
        }

        // Filtro por categoría 
        if (category && category !== "Todos") {
          const categoryLower = String(category).toLowerCase();
          data = data.filter((p) =>
            String(p.categoria || "").toLowerCase().includes(categoryLower)
          );
        }

        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadProducts();
  }, [min, max, category]);

  return (
    <div
      className="product-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "24px",
        padding: "20px 0",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;

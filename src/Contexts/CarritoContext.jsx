import React, { createContext, useContext, useState } from "react";

export const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const variante = (p) =>
    `${p.id}||${(p.size || "").toString()}||${(p.message || "").toString()}`;

  // Ahora acepta un segundo parámetro 'cantidad' (por defecto 1).
  // Diferencia productos por variante (id + size + message) para evitar mezclar cantidades de distintas opciones.
  const agregarProducto = (producto, cantidad = 1) => {
    const variantKey = variante(producto);
    setCarrito((prev) => {
      const existente = prev.find((item) => item.variantKey === variantKey);
      if (existente) {
        return prev.map((item) =>
          item.variantKey === variantKey
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad, variantKey }];
      }
    });
  };


  const eliminarProducto = (idOrVariantKey) => {
    setCarrito((prev) =>
      prev.filter(
        (item) =>
          item.id !== idOrVariantKey && item.variantKey !== idOrVariantKey
      )
    );
  };

  // Renombrado: realizarCompra en vez de vaciarCarrito
  const realizarCompra = () => {
    // Aquí podrías enviar la orden a un servidor antes de limpiar
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, realizarCompra }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
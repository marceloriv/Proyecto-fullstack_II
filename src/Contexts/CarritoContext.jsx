import React, { createContext, useContext, useState } from "react";
import { apiPedidos } from "../Api.js";
import { useAuth } from "../Contexts/AuthContext.jsx"; 

export const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { usuario } = useAuth(); // aqui tenemos los datos del usuario logueado

  const variante = (p) =>
    `${p.id}||${(p.size || "").toString()}||${(p.message || "").toString()}`;

  // Diferencia productos por variante (id + size + message)
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

  // crear pedido en el backend usando datos del usuario
  const realizarCompra = async () => {
    if (carrito.length === 0) {
      throw new Error("No hay productos en el carrito");
    }

    if (!usuario) {
      throw new Error("Debes iniciar sesión para finalizar la compra.");
    }

    const total = Math.round(
      carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0)
    );

    // Tomamos nombre, email y teléfono del usuario logueado
    const nombreCliente =
      usuario.nombre || usuario.name || usuario.username || "Cliente";
    const emailCliente =
      usuario.email || usuario.correo || usuario.mail || "sin-correo@example.com";
    const telefonoCliente =
      usuario.telefono || usuario.phone || usuario.celular || 0;

    const payload = {
      nombre_cliente: nombreCliente,
      email_cliente: emailCliente,
      telefono: telefonoCliente,
      total: total,
    };

    console.log("Creando pedido con payload:", payload);

    const resp = await apiPedidos.post("/pedidos", payload);

    // limpiar carrito después de crear el pedido
    setCarrito([]);

    return resp.data; // el pedido creado
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, eliminarProducto, realizarCompra }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

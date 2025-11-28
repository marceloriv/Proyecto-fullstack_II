import React, { useEffect, useState } from "react";
import { apiPedidos } from "../Api.js";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.jsx"; 

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { usuario } = useAuth(); // usuario logueado
  const fromCheckout = location.state?.fromCheckout;

  const cargarPedidos = async () => {
    try {
      const resp = await apiPedidos.get("/pedidos");
      const todos = resp.data || [];

      // Si hay usuario logueado filtramos por su email
      let pedidosFiltrados = todos;
      if (usuario?.email) {
        pedidosFiltrados = todos.filter(
          (p) => p.email_cliente === usuario.email
        );
      }

      setPedidos(pedidosFiltrados);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // esperamos a tener info del usuario para filtrar bien
    if (usuario) {
      cargarPedidos();
    } else {
      // si no hay usuario, igual cargamos pero quedara vacio
      setPedidos([]);
      setLoading(false);
    }
  }, [usuario]);

  if (loading) return <p>Cargando pedidos...</p>;

  //si no hay usuario puedes decidir qué hacer:
  if (!usuario) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Mis pedidos</h1>
        <p>Debes iniciar sesión para ver tus pedidos.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mis pedidos</h1>

      {fromCheckout && (
        <div className="alert alert-success" role="alert">
          🎉 Tu pedido fue creado correctamente. Aquí puedes ver tus pedidos.
        </div>
      )}

      {pedidos.length === 0 && <p>No tienes pedidos todavía.</p>}

      <ul>
        {pedidos.map((p) => (
          <li key={p.id}>
            <strong>ID:</strong> {p.id}{" "}
            <span> | Estado: {p.estado || "Sin estado"}</span>{" "}
            <span> | Total: {p.total || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

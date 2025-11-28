import React, { useEffect, useState } from "react";
import { apiPedidos } from "../Api.js";

export default function PanelUsuario() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarPedidos = async () => {
    try {
      const resp = await apiPedidos.get("/pedidos");
      setPedidos(resp.data || []);
    } catch (err) {
      console.error("Error cargando pedidos usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  if (loading) return <p>Cargando tus pedidos...</p>;

  return (
    <div className="panel-usuario">
      <h1>Mis pedidos</h1>
      {pedidos.length === 0 && <p>No tienes pedidos aún.</p>}

      <div className="tabla-pedidos">
        {pedidos.map((p) => (
          <div key={p.id} className="pedido-card">
            <p>
              <strong>ID:</strong> {p.id}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {p.fechaPedido || p.fecha || "Sin fecha"}
            </p>
            <p>
              <strong>Estado:</strong> {p.estado || "Sin estado"}
            </p>
            <p>
              <strong>Total:</strong> ${p.total || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

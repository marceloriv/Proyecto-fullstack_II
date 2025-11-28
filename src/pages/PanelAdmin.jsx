import React, { useEffect, useState } from "react";
import { apiPedidos } from "../Api.js";

export default function PanelAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setLoading(true);
      setError("");

      const r = await apiPedidos.get("/pedidos");
      // tu API devuelve un array plano
      setPedidos(Array.isArray(r.data) ? r.data : []);
    } catch (e) {
      console.error("Error cargando pedidos", e);
      setError("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      // se busca el pedido actual en memoria
      const actual = pedidos.find((p) => p.id === id);
      if (!actual) return;

      //se crea un nuevo objeto con el estado actualizado
      const actualizado = { ...actual, estado: nuevoEstado };

      console.log("PUT /pedidos/" + id, actualizado);

      // PUT /api/v1/pedidos/{id}
      await apiPedidos.put(`/pedidos/${id}`, actualizado);

      await cargar();
    } catch (e) {
      console.error("Error cambiando estado del pedido:", e);
      alert("No se pudo cambiar el estado del pedido. Revisa la consola.");
    }
  };

  const cancelar = async (id) => {
    if (!window.confirm("¿Cancelar (eliminar) este pedido?")) return;

    try {
      console.log("DELETE /pedidos/" + id);

      // DELETE /api/v1/pedidos/{id}
      await apiPedidos.delete(`/pedidos/${id}`);

      await cargar();
    } catch (e) {
      console.error("Error cancelando pedido:", e);
      alert("No se pudo cancelar el pedido. Revisa la consola.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Panel Admin — Pedidos</h2>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre_cliente}</td>
              <td>{p.email_cliente}</td>
              <td>{p.estado}</td>
              <td>${p.total}</td>

              <td style={{ width: "220px" }}>
                <select
                  className="form-select form-select-sm"
                  value={p.estado}
                  onChange={(e) => cambiarEstado(p.id, e.target.value)}
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PREPARACION">En preparación</option>
                  <option value="EN_CAMINO">En camino</option>
                  <option value="ENTREGADO">Entregado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>

                <button
                  className="btn btn-danger btn-sm mt-1"
                  onClick={() => cancelar(p.id)}
                >
                  Cancelar (eliminar)
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

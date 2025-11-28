import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { apiPedidos } from "../Api.js";

export default function MisPedidos() {
  // usuario logueado (correo, nombre, id etc.)
  const { usuario } = useAuth(); 
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // si el usuario no esta logueado no hace la petición
  useEffect(() => {
    if (!usuario) {
      setCargando(false);
      return;
    }

    const load = async () => {
      try {
        setCargando(true);

        //trae todos los pedidos desde el backend
        const { data } = await apiPedidos.get("/pedidos");
        const todos = Array.isArray(data) ? data : [];

        //determinar el email del usuario logueado
        const correoUsuario = usuario.correo || usuario.email;

        console.log("Usuario logueado:", usuario);
        console.log("Correo para filtrar:", correoUsuario);
        console.log("Pedidos recibidos:", todos);

        //pedidos cuyo email_cliente coincide con el del usuario
        const propios = todos.filter(
          (p) => p.email_cliente === correoUsuario
        );

        console.log("Pedidos filtrados:", propios);

        setPedidos(propios);
        setError("");
      } catch (e) {
        console.error("Error cargando pedidos:", e);
        setError("No se pudieron cargar tus pedidos.");
      } finally {
        setCargando(false);
      }
    };

    load();
  }, [usuario]);

  if (!usuario) return <p>Debes iniciar sesión para ver tus pedidos.</p>;
  if (cargando) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;
  if (!pedidos.length) return <p>No tienes pedidos registrados aún.</p>;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-3">Mis pedidos</h2>
      <ul className="list-group">
        {pedidos.map((p) => (
          <li key={p.id} className="list-group-item">
            <div><strong>ID:</strong> {p.id}</div>
            <div>Cliente: {p.nombre_cliente}</div>
            <div>Email: {p.email_cliente}</div>
            <div>Estado: {p.estado}</div>
            <div>Total: {p.total}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

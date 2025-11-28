import { apiPedidos } from "../Api.js";

// se obtiene todos los pedidos desde la API
export const getPedidos = async () => {
  const response = await apiPedidos.get("/pedidos");
  return response.data;
};

// se obtiene un pedido especifico por su id
export const getPedidoById = async (id) => {
  const response = await apiPedidos.get(`/pedidos/${id}`);
  return response.data;
};

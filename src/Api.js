import axios from "axios";

const DEFAULT_USUARIOS_URL  = "http://34.239.249.150:8080/api";      
const DEFAULT_PRODUCTOS_URL = "http://34.233.148.230:8081/api/v1";   
const DEFAULT_PEDIDOS_URL   = "http://34.230.137.65:8082/api/v1";   

// toma la url desde .env, sino usa la default
const envUsuariosUrl =
  typeof import.meta.env.VITE_API_URL === "string"
    ? import.meta.env.VITE_API_URL.trim()
    : "";

const envProductosUrl =
  typeof import.meta.env.VITE_API_PRODUCTOS_URL === "string"
    ? import.meta.env.VITE_API_PRODUCTOS_URL.trim()
    : "";

const envPedidosUrl =
  typeof import.meta.env.VITE_API_PEDIDOS_URL === "string"
    ? import.meta.env.VITE_API_PEDIDOS_URL.trim()
    : "";

// cliente Axios para los microservicios
const api = axios.create({
  baseURL: envUsuariosUrl || DEFAULT_USUARIOS_URL, 
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});


const apiProductos = axios.create({
  baseURL: envProductosUrl || DEFAULT_PRODUCTOS_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

const apiPedidos = axios.create({
  baseURL: envPedidosUrl || DEFAULT_PEDIDOS_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

//exportaciones
export default api;
export { api, apiProductos, apiPedidos };

import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../Api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  console.log("BASE URL API USUARIOS:", api.defaults.baseURL);

  // login usa "username" del formulario y busca por correo o nombre
  const login = async ({ username, password }) => {
    const identifier = (username || "").trim();
    const passwordInput = (password || "").trim();

    // Traemos todos los usuarios del backend
    const resp = await api.get("/usuarios");
    const lista = resp.data._embedded?.usuarioModelList || [];

    // Buscamos por correo O nombre + password
    const encontrado = lista.find(
      (u) =>
        (u.correo === identifier || u.nombre === identifier) &&
        u.password === passwordInput
    );

    if (!encontrado) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    // aca definimos quién es admin
    const isAdmin =
      encontrado.correo === "ad.admin@admin.com" || // correo admin
      encontrado.nombre === "admin";                // o nombre "admin"

    const usuarioFinal = { ...encontrado, isAdmin };

    // guardamos usuarioFinal (con isAdmin) en el contexto y en localStorage
    setUsuario(usuarioFinal);
    localStorage.setItem("usuario", JSON.stringify(usuarioFinal));

    return usuarioFinal;
  };

  // register crea un nuevo usuario en /api/usuarios
  const register = async (payload) => {
    const body = {
      nombre: (payload.nombre || "").trim(),
      correo: (payload.email || "").trim(), // el backend usa "correo"
      password: (payload.password || "").trim(),
      telefono: payload.telefono
        ? Number(String(payload.telefono).trim())
        : null,
      direccion: (payload.direccion || "").trim() || null,
    };

    console.log("BODY REGISTER QUE SE ENVÍA:", body);

    const resp = await api.post("/usuarios", body);
    // los nuevos usuarios no son admin
    return { ...resp.data, isAdmin: false };
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  // Cargar sesión guardada (si existe)
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);

      // por si en localStorage quedó sin isAdmin, lo recalculamos
      const isAdmin =
        parsed.correo === "ad.admin@admin.com" || parsed.nombre === "admin";

      setUsuario({ ...parsed, isAdmin });
    }
  }, []);

  const value = { usuario, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../src/contexts/AuthContext";
import Login from "../src/pages/login.jsx";

const renderWithProviders = (ui) =>
  render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );

describe("Componente Login", () => {
  it("renderiza el título correctamente", () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/iniciar/i)).toBeInTheDocument();
  });

  it("contiene un formulario de inicio de sesión", () => {
    renderWithProviders(<Login />);

    // Buscar el input de usuario por label o placeholder o por un input de texto
    const usuario =
      screen.queryByLabelText(/usuario/i) ||
      screen.queryByPlaceholderText(/usuario|user/i) ||
      document.querySelector('input[type="text"], input[type="email"], input:not([type])');

    // Buscar el input de contraseña por label o placeholder o por el input[type="password"]
    const contraseña =
      screen.queryByLabelText(/contraseña|password|clave/i) ||
      screen.queryByPlaceholderText(/contraseña|password|clave|•+/i) ||
      document.querySelector('input[type="password"]');

    expect(usuario).toBeInTheDocument();
    expect(contraseña).toBeInTheDocument();
  });

  it("renderiza el botón de inicio de sesión", () => {
    renderWithProviders(<Login />);
    expect(screen.getByRole("button", { name: /ingresar|iniciar/i })).toBeInTheDocument();
  });
});

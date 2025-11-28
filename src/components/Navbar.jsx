import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { useAuth } from "../Contexts/AuthContext.jsx";

function NavbarComponent() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">Pastelería Mil Sabores</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito</Nav.Link>

            {usuario && (
              <Nav.Link as={Link} to="/pedidos">
                Mis pedidos
              </Nav.Link>
            )}

            <NavDropdown
              title={
                usuario
                  ? (usuario.isAdmin ? 'Panel Admin' : 'Perfil de usuario')
                  : 'Perfil'
              }
              id="basic-nav-dropdown"
            >
              {!usuario && (
                <>
                  <NavDropdown.Item as={Link} to="/registro">
                    📝 Registro
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login">
                    🔐 Iniciar Sesión
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}

              {usuario && (
                <>
                  {usuario.isAdmin ? (
                    <NavDropdown.Item as={Link} to="/admin">
                      👤 Ir al Panel
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/perfilUsuario">
                      👤 Mi perfil
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item as="button" onClick={handleLogout}>
                    🔓 Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

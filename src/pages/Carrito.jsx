import React from "react";
import "../App.css";
import { useCarrito } from "../Contexts/CarritoContext";
import { Button, Image, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.jsx"; 

export default function Carrito() {
  const { carrito, eliminarProducto, realizarCompra } = useCarrito();
  const { usuario } = useAuth(); // saber si está logueado
  const navigate = useNavigate();

  const total = Math.round(
    carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0)
  );

  const handleRealizarCompra = async () => {
    try {
      // Si usuario no está logueado se manda al login
      if (!usuario) {
        navigate("/login", { state: { fromCart: true } });
        return;
      }

      await realizarCompra(); // crea pedido + limpia carrito
      navigate("/pedidos", { state: { fromCheckout: true } });
    } catch (err) {
      console.error("Error al realizar la compra:", err);
      alert(err.message || "Ocurrió un error al crear el pedido");
    }
  };

  return (
    <div className="container py-4 cart-page">
      <h2 className="mb-4">🛒 Tu carrito</h2>

      {carrito.length === 0 ? (
        <p className="cart-empty">El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <Card key={item.variantKey || item.id} className="mb-3 p-2 cart-card">
              <Row className="align-items-center">
                <Col xs={3}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fluid
                    rounded
                    className="cart-img"
                  />
                </Col>
                <Col xs={5}>
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>

                  {item.size && <small className="text-muted">Tamaño: {item.size}</small>}
                  {item.message && item.message.trim() !== "" && (
                    <div><small className="text-muted">Mensaje: "{item.message}"</small></div>
                  )}
                </Col>

                <Col xs={4} className="d-flex justify-content-end align-items-center">
                  <Badge bg="primary" className="me-3">{item.cantidad}</Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(item.variantKey || item.id)}
                  >
                    🗑️
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}

          <div className="cart-footer">
            <h4 className="mt-3">Total: {total} </h4>
            <Button
              variant="primary"
              onClick={handleRealizarCompra}
              className="mt-2 checkout-btn"
            >
              Realizar compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

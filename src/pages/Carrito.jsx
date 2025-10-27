import React from "react";
import "../App.css";
import { useCarrito } from "../contexts/CarritoContext";
import { Button, Image, Row, Col, Card, Badge } from "react-bootstrap";

export default function Carrito() {
  const { carrito, eliminarProducto, realizarCompra } = useCarrito();


  const total = Math.round(
    carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0)
  );

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
                <Col xs={5} className="cart-item-info">
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>

                  {item.size && (
                    <div className="cart-variant">
                      <small className="text-muted">Tamaño: {item.size}</small>
                    </div>
                  )}
                  {item.message && item.message.trim() !== "" && (
                    <div className="cart-variant">
                      <small className="text-muted">Mensaje: "{item.message}"</small>
                    </div>
                  )}
                </Col>
                <Col xs={4} className="d-flex align-items-center justify-content-end">
                  <span className="me-2" title="Cantidad comprada">🛍️</span>
                  <Badge bg="primary" className="me-3 cart-badge">{item.cantidad}</Badge>

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
            <Button variant="primary" onClick={realizarCompra} className="mt-2 checkout-btn">
              Realizar compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

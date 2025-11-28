import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // busca el nombre del producto compatible con múltiples apis
  const nombre =
    product.nombreProducto ||
    product.name ||
    product.nombre ||
    product.titulo ||
    `Producto #${product.id}`;

  // precio compatible
  const precio = product.price ?? product.precio ?? 0;

  // descripción compatible
  const descripcion = product.description || product.descripcion || "";

  // imagen compatible
  const rawImage = product.image || product.imagen || "";
  const imagenSrc = rawImage.startsWith("http")
    ? rawImage
    : `/${rawImage.replace(/^\/?/, "")}`;

  const redirigirProducto = () => {
    navigate(`/detalle_producto/${product.id}`);
  };

  return (
    <Card
      className="h-100 d-flex flex-column shadow-sm"
      style={{ width: "100%", borderRadius: "12px" }}
    >
      {/* IMAGEN */}
      <Card.Img
        variant="top"
        src={imagenSrc}
        alt={nombre}
        style={{
          objectFit: "cover",
          height: "200px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          backgroundColor: "#f7f7f7",
        }}
      />

      <Card.Body className="d-flex flex-column">
        {/* NOMBRE */}
        <Card.Title style={{ fontWeight: "bold" }}>{nombre}</Card.Title>

        {/* DESCRIPCIÓN */}
        {descripcion && (
          <Card.Text className="text-muted" style={{ fontSize: "14px" }}>
            {descripcion}
          </Card.Text>
        )}

        {/* PRECIO */}
        <Card.Text style={{ fontSize: "18px" }}>
          <strong>Precio:</strong> ${precio}
        </Card.Text>

        {/* BOTÓN */}
        <Button
          variant="primary"
          className="mt-auto"
          style={{ borderRadius: "20px" }}
          onClick={redirigirProducto}
        >
          Ver detalle del producto
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

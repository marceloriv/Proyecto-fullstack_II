import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCarrito } from "../Contexts/CarritoContext.jsx";
import { apiProductos } from "../Api.js";

function DetalleDeProducto() {
  const { id } = useParams();
  const { agregarProducto } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("pequeno");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Cargar el producto desde el microservicio
  useEffect(() => {
    const loadProducto = async () => {
      try {
        const resp = await apiProductos.get(`/productos/${id}`);
        setProducto(resp.data);
      } catch (err) {
        console.error("Error cargando producto:", err);
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducto();
  }, [id]);

  if (loading) {
    return (
      <section className="product-detail py-5">
        <div className="container">
          <p className="text-center">Cargando producto...</p>
        </div>
      </section>
    );
  }

  if (notFound || !producto) {
    return (
      <section className="product-detail py-5">
        <div className="container">
          <p className="text-center">
            Producto no encontrado.{" "}
            <Link to="/productos">Volver a productos</Link>
          </p>
        </div>
      </section>
    );
  }
  // sacar el nombre del producto
  const nombre =
  producto.nombreProducto ||
  producto.name ||
  producto.nombre ||
  producto.titulo ||
  `Producto #${producto.id}`;
  const precio = producto.price ?? producto.precio ?? 0;
  const descripcion = producto.description || producto.descripcion || "";

  const rawImage = producto.image || producto.imagen || "";
  const imagenSrc = rawImage.startsWith("http")
    ? rawImage
    : `/${rawImage.replace(/^\/?/, "")}`;

  const categoria =
    producto.category ||
    producto.categoria ||
    producto.categoryLabel ||
    "Sin categoría";

  // agrega el producto al carrito
  const handleAddToCart = () => {
    const qty = Number(quantity) || 1;

    const productoParaCarrito = {
      id: producto.id,
      name: nombre,
      price: precio,
      image: rawImage,
      size,
      message,
    };

    agregarProducto(productoParaCarrito, qty);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  return (
    <>
      <section className="product-detail py-5">
        <div className="container">
          <div className="row">
            {}
            <div className="col-md-6">
              <div className="product-image text-center mb-4">
                <img
                  id="main-product-image"
                  src={imagenSrc}
                  alt={nombre}
                  className="img-fluid rounded"
                />
              </div>
            </div>

            {}
            <div className="col-md-6">
              <h1 className="product-title" id="product-title">
                {nombre}
              </h1>
              <p className="product-price h4 text-primary" id="product-price">
                ${precio}
              </p>
              <div
                className="product-description my-4"
                id="product-description"
              >
                {descripcion}
              </div>

              {}
              <div className="customization-options mb-4">
                <div className="size-options mb-3">
                  <h5>Tamaño:</h5>
                  <div className="btn-group" role="group" aria-label="Tamaños">
                    <button
                      type="button"
                      className={`btn btn-outline-primary ${
                        size === "pequeno" ? "active" : ""
                      }`}
                      onClick={() => setSize("pequeno")}
                      aria-pressed={size === "pequeno"}
                    >
                      Pequeño
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-primary ${
                        size === "mediano" ? "active" : ""
                      }`}
                      onClick={() => setSize("mediano")}
                      aria-pressed={size === "mediano"}
                    >
                      Mediano
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-primary ${
                        size === "grande" ? "active" : ""
                      }`}
                      onClick={() => setSize("grande")}
                      aria-pressed={size === "grande"}
                    >
                      Grande
                    </button>
                  </div>
                </div>

                <div className="message-option mb-3">
                  <h5>Mensaje personalizado (opcional):</h5>
                  <textarea
                    className="form-control message-input"
                    placeholder="Escribe tu mensaje aquí (máx. 50 caracteres)"
                    maxLength={50}
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              {}
              <div className="add-to-cart-section mb-4">
                <div className="d-flex align-items-center">
                  <div className="quantity-selector me-3 d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary quantity-btn"
                      id="decrease-quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="disminuir"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input form-control text-center mx-2"
                      id="product-quantity"
                      value={quantity}
                      min="1"
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        setQuantity(Number.isNaN(v) ? 1 : Math.max(1, v));
                      }}
                      style={{ width: 80 }}
                    />
                    <button
                      className="btn btn-outline-secondary quantity-btn"
                      id="increase-quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="aumentar"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    id="add-to-cart-detail"
                    onClick={handleAddToCart}
                  >
                    Añadir al carrito
                  </button>
                </div>

                {showAlert && (
                  <div className="alert alert-success mt-3" role="alert">
                    Producto añadido al carrito.
                  </div>
                )}
              </div>

              {}
              <div className="product-details">
                <div className="detail-item mb-2">
                  <strong>Categoría:</strong>{" "}
                  <span id="product-category">{categoria}</span>
                </div>
                <div className="detail-item">
                  <strong>Disponibilidad:</strong>{" "}
                  <span className="text-success">En stock</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link to="/productos" className="btn btn-link">
              ← Volver a productos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetalleDeProducto;

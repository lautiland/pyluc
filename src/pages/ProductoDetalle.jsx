import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import { img } from "../paths";
import productos from "../data/productos.json";
import NotFound from "./NotFound";

const WHATSAPP_NUMBER = "5490000000000";

function ProductoDetalle() {
  const { categoriaId, productoId } = useParams();

  const categoria = productos.categorias.find((item) => item.id === categoriaId);
  const producto = categoria?.productos.find((item) => item.id === productoId);

  const relacionados = useMemo(() => {
    if (!categoria || !producto) return [];
    return categoria.productos.filter((item) => item.id !== producto.id);
  }, [categoria, producto]);

  if (!categoria || !producto) {
    return <NotFound />;
  }

  const mensaje = encodeURIComponent(
    `Hola, me interesa el producto: ${producto.nombre}`
  );

  return (
    <section className="surface detail">
      <Breadcrumb
        items={[
          { label: "Inicio", path: "/" },
          { label: categoria.nombre, path: `/categoria/${categoria.id}` },
          { label: producto.nombre }
        ]}
      />

      <div className="detail-grid">
        <img src={img(producto.imagen)} alt={producto.nombre} />

        <div>
          <h1 className="section-title">{producto.nombre}</h1>
          <p className="muted">{producto.descripcion}</p>

          <h3>Especificaciones</h3>
          <ul>
            {Object.entries(producto.especificaciones || {}).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          <a
            className="btn btn-whatsapp"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`}
          >
            Contactar por WhatsApp
          </a>

          <div style={{ marginTop: "0.8rem" }}>
            <Link to={`/categoria/${categoria.id}`} className="btn btn-primary">
              Volver a categoria
            </Link>
          </div>
        </div>
      </div>

      {relacionados.length > 0 ? (
        <div className="relacionados-section">
          <h2>Relacionados</h2>
          <ProductGrid productos={relacionados} categoriaId={categoria.id} />
        </div>
      ) : null}
    </section>
  );
}

export default ProductoDetalle;

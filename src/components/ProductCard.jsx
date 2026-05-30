import { Link } from "react-router-dom";

function ProductCard({ producto, categoriaId }) {
  return (
    <article className="card">
      <img
        src={`/images/${producto.imagen}`}
        alt={producto.nombre}
        loading="lazy"
      />
      <div className="card-content">
        <h3>{producto.nombre}</h3>
        <p className="muted">{producto.descripcion}</p>
        <Link
          className="btn btn-primary"
          to={`/producto/${categoriaId}/${producto.id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;

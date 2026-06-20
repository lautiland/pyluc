import { Link } from "react-router-dom";
import { img } from "../paths";

function ProductCard({ producto, categoriaId }) {
  return (
    <article className="card">
      <img
        src={img(producto.imagen)}
        alt={producto.nombre}
        loading="lazy"
      />
      <div className="card-content">
        <h3>{producto.nombre}</h3>
        <p className="muted">{producto.descripcion}</p>
        <Link
          className="btn btn-primary"
          to={`/producto/${categoriaId}/${producto.id}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;

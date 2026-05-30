import { Link } from "react-router-dom";

function CategoryCard({ categoria }) {
  return (
    <article className="card">
      <img
        src={`/images/${categoria.imagen}`}
        alt={categoria.nombre}
        loading="lazy"
      />
      <div className="card-content">
        <h3>{categoria.nombre}</h3>
        <p className="muted">{categoria.descripcion}</p>
        <small>{categoria.productos.length} productos</small>
        <Link className="btn btn-primary" to={`/categoria/${categoria.id}`}>
          Ver categoria
        </Link>
      </div>
    </article>
  );
}

export default CategoryCard;

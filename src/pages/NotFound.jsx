import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="surface" style={{ padding: "1.2rem" }}>
      <h1 className="section-title">404 - Pagina no encontrada</h1>
      <p className="muted">
        La ruta que buscaste no existe en este scaffold inicial.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <Link className="btn btn-primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;

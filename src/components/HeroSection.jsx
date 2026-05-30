import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="surface hero">
      <div className="hero-banner">
        <div className="hero-copy">
          <h1>Articulos de campo y equitacion</h1>
          <p>
            Seleccion inicial de monturas, embocaduras y herramientas para
            trabajo rural, escuela y paseo. Catalogo simple para arrancar rapido.
          </p>
          <Link className="btn btn-primary" to="/categoria/embocaduras">
            Explorar catalogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-banner">
        <div className="hero-copy">
          <h1>Articulos de campo y deportes encuestres</h1>
          <p>
            Seleccion inicial de monturas, embocaduras y herramientas para
            trabajo rural, escuela y paseo. Catalogo simple para arrancar rapido.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo("sobre-nuestra-marca")}>
              Sobre nuestra marca
            </button>
            <button type="button" className="btn btn-primary" onClick={() => scrollTo("trabajan-con-nosotros")}>
              Trabajan con nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

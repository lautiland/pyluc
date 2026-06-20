import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import { img } from "../paths";
import productos from "../data/productos.json";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />

      <section id="categorias" className="surface" style={{ padding: "1rem", marginTop: "1rem" }}>
        <h2 className="section-title">Categorias</h2>
        <p className="muted">
          Encontra equipamiento para jinete y caballo, con enfoque en uso real
          de campo y mantenimiento diario.
        </p>

        <div className="grid grid-3" style={{ marginTop: "1rem" }}>
          {productos.categorias.map((categoria) => (
            <CategoryCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </section>

      <section id="sobre-nuestra-marca" className="surface" style={{ padding: "1rem", marginTop: "1rem" }}>
        <h2 className="section-title">Sobre nuestra marca</h2>
        <p className="muted">
          En PY.LUC nos dedicamos a la venta de articulos de campo y deportes
          encuestres. Trabajamos con materiales de primera calidad para
          ofrecerle al jinete y al artesano las herramientas que realmente
          necesita en el dia a dia.
        </p>
      </section>

      <section id="trabajan-con-nosotros" className="surface" style={{ padding: "1rem", marginTop: "1rem" }}>
        <h2 className="section-title">Trabajan con nosotros</h2>
        <p className="muted">
          Contamos con la confianza de marcas lideres y proveedores de todo el pais.
          Constantemente incorporamos nuevos socios comerciales para brindar la mejor
          variedad de productos de campo y deportes encuestres.
        </p>
        <div className="grid grid-4" style={{ marginTop: "1rem" }}>
          {["Proveedor 1", "Proveedor 2", "Proveedor 3", "Proveedor 4", "Proveedor 5", "Proveedor 6"].map((nombre, i) => (
            <div key={i} className="proveedor-card">
              <img src={img("category-placeholder.svg")} alt={nombre} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;

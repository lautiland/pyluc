import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import productos from "../data/productos.json";

function Home() {
  return (
    <>
      <HeroSection />

      <section className="surface" style={{ padding: "1rem" }}>
        <h2 className="section-title">Categorias destacadas</h2>
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
    </>
  );
}

export default Home;

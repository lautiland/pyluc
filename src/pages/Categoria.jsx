import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import productos from "../data/productos.json";
import NotFound from "./NotFound";

function Categoria() {
  const { id } = useParams();
  const categoria = productos.categorias.find((item) => item.id === id);

  if (!categoria) {
    return <NotFound />;
  }

  return (
    <section className="surface" style={{ padding: "1rem" }}>
      <Breadcrumb
        items={[
          { label: "Inicio", path: "/" },
          { label: categoria.nombre }
        ]}
      />
      <h1 className="section-title">{categoria.nombre}</h1>
      <p className="muted">{categoria.descripcion}</p>

      <div style={{ marginTop: "1rem" }}>
        <ProductGrid productos={categoria.productos} categoriaId={categoria.id} />
      </div>
    </section>
  );
}

export default Categoria;

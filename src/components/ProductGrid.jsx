import ProductCard from "./ProductCard";

function ProductGrid({ productos, categoriaId }) {
  if (!productos.length) {
    return <p className="muted">No hay productos cargados.</p>;
  }

  return (
    <section className="grid grid-3">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          categoriaId={categoriaId}
        />
      ))}
    </section>
  );
}

export default ProductGrid;

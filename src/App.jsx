import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Categoria from "./pages/Categoria";
import ProductoDetalle from "./pages/ProductoDetalle";
import ContactoProveedores from "./pages/ContactoProveedores";
import NotFound from "./pages/NotFound";
import productos from "./data/productos.json";

function App() {
  return (
    <div className="app-shell">
      <Navbar categorias={productos.categorias} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:id" element={<Categoria />} />
          <Route
            path="/producto/:categoriaId/:productoId"
            element={<ProductoDetalle />}
          />
          <Route
            path="/contacto-proveedores"
            element={<ContactoProveedores />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { useState } from "react";
import { Link } from "react-router-dom";
import { img } from "../paths";

function Navbar({ categorias }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="surface topbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        <img src={img("logo-pyluc.svg")} alt="PY.LUC" />
      </Link>

      <button
        type="button"
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        id="main-menu"
        className={`hamburger-panel ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegacion principal"
      >
        <div className="menu-section">
          <h3>Categorias</h3>
          <div className="menu-list">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                to={`/categoria/${categoria.id}`}
                onClick={closeMenu}
              >
                {categoria.nombre}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

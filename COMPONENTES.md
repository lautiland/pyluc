# COMPONENTES.md

Documentación de componentes React en PYLUC.

---

## 1. Componentes de Layout (Compartidos)

### Navbar

**Ubicación**: `src/components/Navbar.jsx`

**Propósito**: Navegación principal, visible en todas las páginas.

**Props**:
```typescript
interface NavbarProps {
  categorias: Categoria[];
  logoUrl?: string; // default: "/images/logo.png"
}
```

**Estado local**:
```javascript
const [menuOpen, setMenuOpen] = useState(false); // Menú hamburguesa
```

**Responsividad**:
- **Desktop (lg+)**: Navbar horizontal con menú dropdown
- **Móvil (md-)**: Navbar con logo + botón hamburguesa

**Características**:
- Logo clickeable que enlaza a `/`
- Dropdown de categorías (hover en desktop, click en móvil)
- Menú hamburguesa responsivo
- Links activos destacados (React Router `useLocation`)

**Renderizado simplificado**:
```jsx
export function Navbar({ categorias, logoUrl = "/images/logo.png" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logoUrl} alt="PYLUC" className="logo" />
      </Link>
      
      <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger">
        ☰
      </button>
      
      {menuOpen && (
        <ul className="menu">
          {categorias.map(cat => (
            <li key={cat.id}>
              <Link to={`/categoria/${cat.id}`}>{cat.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
```

---

### Footer

**Ubicación**: `src/components/Footer.jsx`

**Propósito**: Contactos y navegación secundaria, visible en todas las páginas.

**Props**:
```typescript
interface FooterProps {
  numeroWhatsApp: string; // ej: "+549123456789"
  emailContacto: string;  // ej: "contacto@pyluc.com"
  año?: number;           // default: new Date().getFullYear()
}
```

**Contenido**:
- Sección 1: WhatsApp para clientes
- Sección 2: Email y WhatsApp general
- Sección 3: Link a formulario de proveedores
- Copyright

**Renderizado simplificado**:
```jsx
export function Footer({ numeroWhatsApp, emailContacto }) {
  return (
    <footer className="footer">
      <section>
        <h4>Comprar un producto</h4>
        <a href={`https://wa.me/${numeroWhatsApp}?text=Hola, me interesa...`}>
          WhatsApp
        </a>
      </section>
      
      <section>
        <h4>Contacto general</h4>
        <a href="mailto:{emailContacto}">Email</a>
        <a href={`https://wa.me/${numeroWhatsApp}`}>WhatsApp</a>
      </section>
      
      <section>
        <h4>Proveedores</h4>
        <Link to="/contacto-proveedores">Solicita información</Link>
      </section>
      
      <p className="copyright">© {new Date().getFullYear()} PYLUC</p>
    </footer>
  );
}
```

---

### Breadcrumb

**Ubicación**: `src/components/Breadcrumb.jsx`

**Propósito**: Mostrar ruta de navegación en categorías y detalles de producto.

**Props**:
```typescript
interface BreadcrumbProps {
  items: {
    label: string;
    path?: string; // Si no hay path, es el item actual (no clickeable)
  }[];
}
```

**Ejemplos de uso**:
```jsx
// En Categoria.jsx
<Breadcrumb items={[
  { label: "Home", path: "/" },
  { label: categoria.nombre } // Sin path = actual
]} />

// En ProductoDetalle.jsx
<Breadcrumb items={[
  { label: "Home", path: "/" },
  { label: categoria.nombre, path: `/categoria/${categoriaId}` },
  { label: producto.nombre } // Sin path = actual
]} />
```

**Renderizado simplificado**:
```jsx
export function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, idx) => (
        <span key={idx}>
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="current">{item.label}</span>
          )}
          {idx < items.length - 1 && <span> > </span>}
        </span>
      ))}
    </nav>
  );
}
```

---

### HeroSection

**Ubicación**: `src/components/HeroSection.jsx`

**Propósito**: Banner destacado en Home con CTA.

**Props**:
```typescript
interface HeroSectionProps {
  titulo: string;
  subtitulo: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
}
```

**Renderizado simplificado**:
```jsx
export function HeroSection({ 
  titulo, 
  subtitulo, 
  backgroundImage, 
  ctaLabel = "Explorar Catálogo",
  ctaLink = "/categoria/embocaduras"
}) {
  return (
    <section 
      className="hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-content">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        <Link to={ctaLink} className="btn-primary">{ctaLabel}</Link>
      </div>
    </section>
  );
}
```

---

## 2. Componentes de Producto

### ProductCard

**Ubicación**: `src/components/ProductCard.jsx`

**Propósito**: Tarjeta de producto en grids (Home, Categoria).

**Props**:
```typescript
interface ProductCardProps {
  producto: Producto;
  categoriaId: string;
  onClick?: () => void; // Callback opcional
}
```

**Características**:
- Imagen con lazy loading
- Nombre y descripción corta
- Botón "Ver detalles"
- Hover effect con sombra
- Responsive

**Renderizado simplificado**:
```jsx
export function ProductCard({ producto, categoriaId }) {
  return (
    <div className="product-card">
      <img 
        src={`/images/productos/${categoriaId}/${producto.imagen}`}
        alt={producto.nombre}
        loading="lazy"
      />
      <h3>{producto.nombre}</h3>
      <p className="description">{producto.descripcion.substring(0, 100)}...</p>
      <Link 
        to={`/producto/${categoriaId}/${producto.id}`}
        className="btn-secondary"
      >
        Ver detalles →
      </Link>
    </div>
  );
}
```

---

### ProductGrid

**Ubicación**: `src/components/ProductGrid.jsx`

**Propósito**: Grid responsivo de ProductCards.

**Props**:
```typescript
interface ProductGridProps {
  productos: Producto[];
  categoriaId: string;
}
```

**Características**:
- Responsive: 1 col (móvil), 2 cols (tablet), 3 cols (desktop)
- Spacing consistente
- Fallback si no hay productos

**Renderizado simplificado**:
```jsx
export function ProductGrid({ productos, categoriaId }) {
  if (!productos.length) {
    return <p className="empty">No hay productos en esta categoría</p>;
  }
  
  return (
    <div className="product-grid">
      {productos.map(producto => (
        <ProductCard 
          key={producto.id}
          producto={producto}
          categoriaId={categoriaId}
        />
      ))}
    </div>
  );
}
```

**Estilos Tailwind sugeridos**:
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

---

### CategoryCard

**Ubicación**: `src/components/CategoryCard.jsx`

**Propósito**: Tarjeta de categoría en Home.

**Props**:
```typescript
interface CategoryCardProps {
  categoria: Categoria;
}
```

**Características**:
- Imagen de categoría (preview)
- Nombre y descripción corta
- Badge con número de productos
- Efecto hover

**Renderizado simplificado**:
```jsx
export function CategoryCard({ categoria }) {
  const productCount = categoria.productos.length;
  
  return (
    <div className="category-card">
      <img 
        src={`/images/productos/${categoria.imagen}`}
        alt={categoria.nombre}
      />
      <div className="overlay">
        <h2>{categoria.nombre}</h2>
        <p>{categoria.descripcion}</p>
        <span className="badge">{productCount} productos</span>
      </div>
    </div>
  );
}
```

---

## 3. Componentes de Contacto

### ContactForm

**Ubicación**: `src/components/ContactForm.jsx`

**Propósito**: Formulario genérico de contacto (usado en ContactoProveedores).

**Props**:
```typescript
interface ContactFormProps {
  tipoContacto: "general" | "proveedores";
  formspreeId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
```

**Estado local**:
```javascript
const [formData, setFormData] = useState({
  nombre: "",
  email: "",
  empresa: "", // solo en proveedores
  asunto: "",
  mensaje: ""
});

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
```

**Validación**:
- Email válido (regex simple)
- Nombre no vacío
- Mensaje mínimo 10 caracteres

**Integración Formspree**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  
  try {
    const response = await fetch(
      `https://formspree.io/f/${formspreeId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }
    );
    
    if (response.ok) {
      setMessage('¡Formulario enviado! Te responderemos pronto.');
      setFormData({});
      onSuccess?.();
    } else {
      throw new Error('Error al enviar');
    }
  } catch (err) {
    setError('No pudimos enviar tu mensaje. Intenta de nuevo.');
    onError?.(err);
  } finally {
    setLoading(false);
  }
};
```

**Renderizado simplificado**:
```jsx
export function ContactForm({ tipoContacto, formspreeId, onSuccess }) {
  // ... estado y handlers
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Tu nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        required
      />
      
      <input
        type="email"
        placeholder="Tu email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      {tipoContacto === "proveedores" && (
        <input
          type="text"
          placeholder="Nombre de tu empresa"
          value={formData.empresa}
          onChange={(e) => setFormData({...formData, empresa: e.target.value})}
        />
      )}
      
      <textarea
        placeholder="Tu mensaje..."
        value={formData.mensaje}
        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
        rows="5"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

---

## 4. Estructura de Carpetas de Componentes

```
src/components/
├── Layout/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Breadcrumb.jsx
│   └── HeroSection.jsx
│
├── Product/
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── CategoryCard.jsx
│   └── ProductDetails.jsx (opcional, para detalles en modal)
│
├── Contact/
│   ├── ContactForm.jsx
│   └── ContactButton.jsx (opcional)
│
└── Common/
    ├── Loading.jsx
    ├── Error.jsx
    └── Button.jsx (reutilizable)
```

---

## 5. Componentes Opcionales Futuros

### SearchBar (búsqueda)
```jsx
export function SearchBar({ productos, onResultsChange }) {
  // Implementar búsqueda por nombre/descripción
  // Mostrar dropdown de resultados
}
```

### ProductFilters (filtros)
```jsx
export function ProductFilters({ categorias, onFilterChange }) {
  // Filtros por categoría, precio, material, etc.
}
```

### ProductGallery (galería de imágenes)
```jsx
export function ProductGallery({ imagenes }) {
  // Múltiples imágenes por producto con zoom y lightbox
}
```

### ReviewsSection (reseñas)
```jsx
export function ReviewsSection({ reviews }) {
  // Mostrar reseñas de clientes (si se integra backend)
}
```

---

## 6. Importación en App.jsx

```javascript
// Layouts
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Categoria from './pages/Categoria';
import ProductoDetalle from './pages/ProductoDetalle';
import ContactoProveedores from './pages/ContactoProveedores';
import NotFound from './pages/NotFound';

// Data
import productos from './data/productos.json';

function App() {
  const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMERO;
  const emailContacto = import.meta.env.VITE_EMAIL_CONTACTO;
  
  return (
    <div className="app">
      <Navbar categorias={productos.categorias} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:id" element={<Categoria />} />
        <Route path="/producto/:categoriaId/:productoId" element={<ProductoDetalle />} />
        <Route path="/contacto-proveedores" element={<ContactoProveedores />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer 
        numeroWhatsApp={numeroWhatsApp}
        emailContacto={emailContacto}
      />
    </div>
  );
}
```

---

## 7. Convenciones de Estilo

### Tailwind CSS

```jsx
// Colores comunes
className="text-gray-800 bg-white shadow-md hover:shadow-lg"
className="bg-blue-600 text-white hover:bg-blue-700"
className="border border-gray-200 rounded-lg"

// Spacing
className="p-4 m-2 gap-6"
className="pt-8 pb-4"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="text-sm md:text-base lg:text-lg"
className="px-4 md:px-8 lg:px-12"

// Efectos
className="transition-all duration-200"
className="transform hover:scale-105"
className="opacity-0 hover:opacity-100"
```

### Props booleanas

```javascript
// Preferir
<Button active={true} />
<Button disabled={isLoading} />

// En lugar de
<Button active="true" />
<Button disabled="disabled" />
```

---

## 8. Testing de Componentes

Estructura sugerida (usando Vitest + React Testing Library):

```javascript
// src/__tests__/components/ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard';

describe('ProductCard', () => {
  const mockProducto = {
    id: 'test-id',
    nombre: 'Test Producto',
    descripcion: 'Test description',
    imagen: 'test.jpg'
  };
  
  it('renders product name', () => {
    render(
      <BrowserRouter>
        <ProductCard producto={mockProducto} categoriaId="test" />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Producto')).toBeInTheDocument();
  });
});
```

---

**Última actualización**: May 5, 2026

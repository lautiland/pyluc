# RUTAS_NAVEGACION.md

Mapeo completo de rutas y navegación en PYLUC.

---

## 1. Tabla de Rutas

| Ruta | Componente | Descripción | Parámetros |
|------|-----------|-------------|-----------|
| `/` | Home | Landing page con galería de categorías | - |
| `/categoria/:id` | Categoria | Lista de productos de una categoría | `id`: ID de categoría |
| `/producto/:categoriaId/:productoId` | ProductoDetalle | Detalle completo de un producto | `categoriaId`, `productoId` |
| `/contacto-proveedores` | ContactoProveedores | Formulario de contacto para proveedores | - |
| `*` (cualquier otra) | NotFound | Página 404 | - |

---

## 2. Definición Detallada de Rutas

### Ruta: `/` (Home)

**Componente**: `src/pages/Home.jsx`

**Propósito**: Landing page principal que muestra todas las categorías.

**Contenido**:
- HeroSection (banner con título, subtítulo, CTA)
- Grid de categorías (cada una es una tarjeta clickeable)
- Footer con contactos

**Datos que consume**:
- `productos.categorias` (para renderizar cada categoría)

**Navegación saliente**:
- Cada categoría enlaza a `/categoria/:id`
- Footer: links a WhatsApp, email, `/contacto-proveedores`

**Renderizado**:
```jsx
<div className="home">
  <HeroSection />
  <div className="categorias-grid">
    {categorias.map(cat => (
      <Link to={`/categoria/${cat.id}`} key={cat.id}>
        <CategoryCard categoria={cat} />
      </Link>
    ))}
  </div>
</div>
```

---

### Ruta: `/categoria/:id`

**Componente**: `src/pages/Categoria.jsx`

**Parámetro**: `:id` (ej: `embocaduras`, `cuchillos`)

**Propósito**: Mostrar todos los productos de una categoría específica.

**Contenido**:
- Breadcrumb: `Home > [Nombre Categoría]`
- Título y descripción de la categoría
- Grid de productos con ProductCards
- Footer

**Datos que consume**:
- `useParams()` obtiene `id`
- Filtra en `productos.categorias` para encontrar la categoría
- Extrae `.productos` de esa categoría

**Navegación saliente**:
- Cada producto enlaza a `/producto/:categoriaId/:productoId`
- Breadcrumb "Home" enlaza a `/`
- Footer

**Validación**:
- Si `id` no existe en categorías → mostrar NotFound (404)

**Renderizado**:
```jsx
function Categoria() {
  const { id: categoriaId } = useParams();
  const categoria = productos.categorias.find(c => c.id === categoriaId);
  
  if (!categoria) return <NotFound />;
  
  return (
    <>
      <Breadcrumb items={[{label: "Home", path: "/"}, {label: categoria.nombre}]} />
      <h1>{categoria.nombre}</h1>
      <ProductGrid productos={categoria.productos} categoriaId={categoriaId} />
    </>
  );
}
```

---

### Ruta: `/producto/:categoriaId/:productoId`

**Componente**: `src/pages/ProductoDetalle.jsx`

**Parámetros**:
- `:categoriaId` (ej: `embocaduras`)
- `:productoId` (ej: `bridones-filete`)

**Propósito**: Mostrar detalles completos de un producto con opción de contacto.

**Contenido**:
- Breadcrumb: `Home > [Categoría] > [Producto]`
- Imagen grande del producto
- Nombre, descripción completa
- Especificaciones técnicas (si existen)
- **Botón CTA "Contactar por WhatsApp"** (acción principal)
- Productos relacionados de la misma categoría (grid)
- Footer

**Datos que consume**:
- `useParams()` obtiene `categoriaId` y `productoId`
- Filtra categoría y luego producto dentro de esa categoría

**Navegación saliente**:
- Breadcrumb: links a `/` y `/categoria/:categoriaId`
- Botón WhatsApp: abre `wa.me/[NUMERO]?text=Hola, me interesa: [NOMBRE PRODUCTO]`
- Productos relacionados: links a `/producto/:categoriaId/:otroId`

**Validación**:
- Si categoría no existe → NotFound
- Si producto no existe en categoría → NotFound

**Interactividad**:
```jsx
function ProductoDetalle() {
  const { categoriaId, productoId } = useParams();
  const categoria = productos.categorias.find(c => c.id === categoriaId);
  const producto = categoria?.productos.find(p => p.id === productoId);
  
  if (!categoria || !producto) return <NotFound />;
  
  const handleContactar = () => {
    const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${producto.nombre}`);
    window.open(`https://wa.me/${NUMERO_VENDEDOR}?text=${mensaje}`, '_blank');
  };
  
  return (
    <>
      <Breadcrumb items={[
        {label: "Home", path: "/"},
        {label: categoria.nombre, path: `/categoria/${categoriaId}`},
        {label: producto.nombre}
      ]} />
      <img src={`/images/productos/${categoriaId}/${producto.imagen}`} />
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <button onClick={handleContactar}>Contactar por WhatsApp</button>
      <RelatedProducts />
    </>
  );
}
```

---

### Ruta: `/contacto-proveedores`

**Componente**: `src/pages/ContactoProveedores.jsx`

**Propósito**: Formulario de contacto para nuevos proveedores.

**Contenido**:
- Título: "Contacto para Proveedores"
- Texto explicativo: "¿Eres proveedor? Contáctanos aquí"
- Formulario:
  - Nombre (text input)
  - Email (email input)
  - Empresa (text input)
  - Asunto (select o text)
  - Mensaje (textarea)
  - Botón Submit
- Footer

**Datos que consume**:
- Estado local del formulario (`formData`)
- FORM_ID de Formspree desde `.env`

**Navegación saliente**:
- Footer: links a WhatsApp, email, Home
- Breadcrumb (si existe): `Home > Contacto de Proveedores`

**Interactividad (Formspree)**:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (response.ok) {
    setMessage('¡Gracias! Nos pondremos en contacto pronto.');
    setFormData({});
  }
};
```

---

### Ruta: `*` (Fallback 404)

**Componente**: `src/pages/NotFound.jsx`

**Propósito**: Capturar todas las rutas no definidas.

**Contenido**:
- Icono de error 404
- Mensaje: "Página no encontrada"
- Descripción amigable
- Botón "Volver a Home"
- Footer

**Navegación saliente**:
- Botón "Volver" enlaza a `/`

**Definición en App.jsx**:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/categoria/:id" element={<Categoria />} />
  <Route path="/producto/:categoriaId/:productoId" element={<ProductoDetalle />} />
  <Route path="/contacto-proveedores" element={<ContactoProveedores />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 3. Árbol de Navegación

```
/ (Home)
├─ /categoria/:id (todas las categorías)
│  ├─ /producto/:categoriaId/:productoId
│  │  ├─ wa.me/[NUMERO] (WhatsApp)
│  │  └─ Productos relacionados (misma categoría)
│  └─ Footer
├─ /contacto-proveedores
│  ├─ Formspree POST (email)
│  └─ Footer
└─ Footer
   ├─ wa.me (contacto general)
   ├─ mailto (email general)
   └─ /contacto-proveedores
```

---

## 4. Breadcrumbs por Página

### Home
```
(Sin breadcrumb - es la raíz)
```

### Categoria
```
Home > Embocaduras
 ↓      ↓
 /      /categoria/embocaduras
```

### ProductoDetalle
```
Home > Embocaduras > Bridones y Filete
 ↓      ↓              ↓
 /      /categoria/    /producto/embocaduras/bridones-filete
        embocaduras
```

### ContactoProveedores
```
Home > Contacto de Proveedores
 ↓      ↓
 /      /contacto-proveedores
```

---

## 5. Ejemplos de URLs en Producción

Asumiendo dominio `pyluc.com`:

| Ruta | URL Completa |
|------|--------------|
| Home | `https://pyluc.com/` |
| Embocaduras | `https://pyluc.com/categoria/embocaduras` |
| Bridones y Filete | `https://pyluc.com/producto/embocaduras/bridones-filete` |
| Cuchillos | `https://pyluc.com/categoria/cuchillos` |
| Contacto Proveedores | `https://pyluc.com/contacto-proveedores` |
| Página no existe | `https://pyluc.com/pagina-inexistente` → 404 |

---

## 6. Convenciones de Parametrización

### ID de Categoría `:id`
- Lowercase
- Sin espacios (guiones)
- Matches con `productos.categorias[].id`
- Ejemplos: `embocaduras`, `cuchillos`, `accesorios-alpaca`

### ID de Producto `:productoId`
- Lowercase
- Sin espacios (guiones)
- Unico dentro de categoría (no global)
- Matches con `productos.categorias[].productos[].id`
- Ejemplos: `bridones-filete`, `carniceria-arbolito`

---

## 7. Links Internos en Componentes

### Navbar (navegación principal)
```jsx
// Categorías (dropdown o sidebar)
{categorias.map(cat => (
  <Link key={cat.id} to={`/categoria/${cat.id}`}>
    {cat.nombre}
  </Link>
))}

// Logo
<Link to="/">
  <img src="/images/logo.png" alt="PYLUC" />
</Link>
```

### ProductCard
```jsx
<Link to={`/producto/${categoriaId}/${producto.id}`}>
  <div className="card">
    <img src={...} />
    <h3>{producto.nombre}</h3>
  </div>
</Link>
```

### Footer
```jsx
<Link to="/contacto-proveedores">Contacto de Proveedores</Link>
<a href="https://wa.me/[NUMERO]">WhatsApp</a>
<a href="mailto:contacto@pyluc.com">Email</a>
```

### Breadcrumb
```jsx
<nav className="breadcrumb">
  <Link to="/">Home</Link>
  {items.map(item => (
    <Link key={item.path} to={item.path}>{item.label}</Link>
  ))}
</nav>
```

---

## 8. Manejo de Errores de Navegación

### Categoría no existe
```javascript
const categoria = productos.categorias.find(c => c.id === categoriaId);
if (!categoria) return <Redirect to="/404" />;
// o con Navigate de React Router v6
if (!categoria) return <Navigate to="/404" replace />;
```

### Producto no existe
```javascript
const producto = categoria?.productos.find(p => p.id === productoId);
if (!producto) return <Navigate to="/404" replace />;
```

### Ruta inválida
```jsx
<Route path="*" element={<NotFound />} />
```

---

## 9. Enlace Externo: WhatsApp

**Formato general**:
```
https://wa.me/[NUMERO]?text=[MENSAJE]
```

**Ejemplos de uso**:

1. **Contacto de producto**:
   ```javascript
   const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${producto.nombre}`);
   const link = `https://wa.me/${NUMERO_VENDEDOR}?text=${mensaje}`;
   ```

2. **Contacto general**:
   ```javascript
   const link = `https://wa.me/${NUMERO_VENDEDOR}?text=Hola, tengo una consulta`;
   ```

3. **En HTML**:
   ```html
   <a href="https://wa.me/+549XXXXXXXXX?text=Hola%20PYLUC" target="_blank">
     Contactar por WhatsApp
   </a>
   ```

**Importante**: Siempre URL-encodear el mensaje con `encodeURIComponent()` o `%20` para espacios.

---

## 10. Enlace Externo: Email (Formspree)

**Endpoint POST**:
```
https://formspree.io/f/{FORM_ID}
```

**Ejemplo**:
```javascript
fetch('https://formspree.io/f/abcdef123', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'proveedor@empresa.com',
    nombre: 'Juan Pérez',
    empresa: 'Mi Empresa',
    mensaje: 'Quisiera ser proveedor'
  })
})
.then(response => {
  if (response.ok) {
    console.log('Enviado correctamente');
  }
});
```

---

**Última actualización**: May 5, 2026

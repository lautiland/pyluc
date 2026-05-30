# ESPECIFICACION.md

Especificación técnica completa de PYLUC - Tienda Online de Artículos de Campo.

---

## 1. Descripción General

**PYLUC** es una aplicación web estática desarrollada con React que permite:
- Navegar un catálogo jerárquico de 40+ productos organizados en 7 categorías
- Ver detalles completos de cada producto con imágenes
- Contactar al vendedor por WhatsApp directamente desde la página del producto
- Enviar consultas por email a través de un formulario
- Solicitud de información para nuevos proveedores

**Tipo de aplicación**: SPA (Single Page Application) estática, sin backend.

---

## 2. Stack Tecnológico Detallado

### Frontend
- **Framework**: React 18+
- **Routing**: React Router v6
- **Build tool**: Vite (dev server rápido, bundle optimizado)
- **CSS**: Tailwind CSS (utility-first)
- **Iconos**: React Icons (icons.react.icons.dev)
- **HTTP Client**: Fetch API (nativo del navegador)

### Hosting & Deployment
- **Hosting**: Netlify (recomendado) o GitHub Pages
- **Dominio personalizado**: Compatible con ambas plataformas
- **Zona DNS**: Configurable según proveedor

### Servicios Externos
- **WhatsApp**: `wa.me/[NUMERO]` (sin autenticación)
- **Email**: Formspree (`formspree.io`) - formulario de contacto de proveedores
- **Almacenamiento de imágenes**: Carpeta `public/images/` (versionada con Git)

### Herramientas de Desarrollo
- **Node.js**: 16+ (recomendado 18+)
- **npm** o **yarn**
- **Code editor**: VS Code (recomendado) con extensiones para React

---

## 3. Arquitectura de la Aplicación

```
┌─────────────────────────────────────┐
│         React SPA (Vite)            │
├─────────────────────────────────────┤
│  App.jsx                            │
│  ├─ React Router v6                 │
│  │  ├─ Home (/)                     │
│  │  ├─ Categoria (/:id)             │
│  │  ├─ ProductoDetalle (/:cat/:id)  │
│  │  ├─ ContactoProveedores          │
│  │  └─ NotFound (404)               │
│  │                                  │
│  └─ Layout compartido               │
│     ├─ Navbar                       │
│     ├─ Página dinámica              │
│     └─ Footer                       │
└─────────────────────────────────────┘
         ↓           ↓           ↓
    ┌────────┐  ┌────────┐  ┌────────┐
    │ JSON   │  │ WhatsApp│  │Formspree│
    │ Datos  │  │  API   │  │ (Email) │
    └────────┘  └────────┘  └────────┘
```

---

## 4. Flujo de Datos

### Datos de Productos
```
public/images/productos/
│
src/data/productos.json
│
Home.jsx / Categoria.jsx / ProductoDetalle.jsx
│
Re-render de componentes
```

**Características clave**:
- `productos.json` se importa estáticamente en JavaScript
- Vite bundlea el JSON en tiempo de build
- React cachea el estado en memoria durante la sesión
- No hay llamadas API (sin latencia de red)

### Integración WhatsApp
```
Botón en ProductoDetalle.jsx
│
onClick → URL wa.me con parámetros
│
window.open() o <a href="...">
│
Cliente: Se abre WhatsApp (mobile) o web.whatsapp.com (desktop)
```

**Formato de URL**:
```javascript
const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${nombreProducto}`);
const link = `https://wa.me/${numeroVendedor}?text=${mensaje}`;
```

### Integración Formspree
```
Formulario en ContactoProveedores.jsx
│
POST a https://formspree.io/f/{FORM_ID}
│
Formspree: Envía email a tu cuenta registrada
│
Usuario: Recibe email con respuesta automática opcional
```

---

## 5. Estructura de Componentes React

### Componentes Principales

#### **Navbar**
- Props: `categorias` (array de categorías)
- Estado: `menuOpen` (boolean para menú móvil)
- Renderiza: Logo, menú dropdown, menú hamburguesa en móvil
- Integración: React Router `<Link>` para navegación

#### **Footer**
- Props: `contacto` (objeto con datos de contacto)
- Renderiza: Tres secciones de contacto
  1. WhatsApp para clientes
  2. Email y WhatsApp general
  3. Link a formulario de proveedores
- Iconos: React Icons (`FaWhatsapp`, `MdEmail`)

#### **ProductCard**
- Props: `producto` (objeto producto), `categoriaId` (string)
- Renderiza: Imagen, nombre, descripción corta, botón "Ver detalles"
- Link: `<Link to={/producto/${categoriaId}/${producto.id}}>`
- Hover effect: Sutil (Tailwind: `hover:shadow-lg`, `transition-shadow`)

#### **ProductGrid**
- Props: `productos` (array), `categoriaId` (string)
- Renderiza: Grid de ProductCards con responsive layout
- Clases Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

#### **Breadcrumb**
- Props: `items` (array de { label, path })
- Renderiza: Ruta de navegación con separadores
- Ejemplo: `Home > Embocaduras > Bridones y Filete`

#### **ContactForm**
- Props: `tipoContacto` (string: "general" | "proveedores")
- Estado: `formData` (nombre, email, asunto, mensaje)
- Endpoint: POST a Formspree
- Feedback: Mensajes de éxito/error

#### **HeroSection**
- Props: `titulo`, `subtitulo`, `backgroundImage`
- Renderiza: Banner grande con imagen de fondo y CTA
- Usado en: Home

### Componentes de Página

#### **Home.jsx**
- Renderiza: HeroSection + Grid de categorías
- Lógica: Lee `categorias` de `productos.json`
- Links: Cada categoría enlaza a `/categoria/:id`

#### **Categoria.jsx**
- Params: `useParams()` obtiene `categoriaId`
- Lógica: Filtra productos por categoría
- Renderiza: Breadcrumb + Título + ProductGrid
- Fallback: Muestra 404 si categoría no existe

#### **ProductoDetalle.jsx**
- Params: `useParams()` obtiene `categoriaId` y `productoId`
- Renderiza: Imagen grande, descripción, detalles técnicos
- **CTA principal**: Botón "Contactar por WhatsApp"
  - OnClick: Abre `wa.me/[NUMERO]?text=Hola, me interesa: [PRODUCTO]`
- Relacionados: Grid de productos similares de la categoría
- Fallback: 404 si producto no existe

#### **ContactoProveedores.jsx**
- Renderiza: Formulario de contacto + información
- Integración: Formspree POST
- Feedback: Mensaje de confirmación al enviar

#### **NotFound.jsx**
- Renderiza: Página 404 amigable con link a Home

---

## 6. Estructura de Datos: `productos.json`

Ver **[ESTRUCTURA_DATOS.md](./ESTRUCTURA_DATOS.md)** para schema completo.

**Resumen**:
```javascript
{
  "categorias": [
    {
      "id": "embocaduras",
      "nombre": "Embocaduras",
      "descripcion": "...",
      "productos": [
        {
          "id": "bridones-filete",
          "nombre": "Bridones y Filete",
          "descripcion": "...",
          "imagen": "bridones-filete.jpg",
          "especificaciones": { /* opcional */ }
        }
      ]
    }
  ]
}
```

---

## 7. Rutas y Navegación

Ver **[RUTAS_NAVEGACION.md](./RUTAS_NAVEGACION.md)** para detalle completo.

**Rutas principales**:

| Ruta | Componente | Props | Estado |
|------|-----------|-------|--------|
| `/` | Home | - | Carga categorías |
| `/categoria/:id` | Categoria | `categoriaId` | Filtra productos |
| `/producto/:categoriaId/:productoId` | ProductoDetalle | ambos params | Busca producto |
| `/contacto-proveedores` | ContactoProveedores | - | Form state |
| `*` | NotFound | - | Fallback 404 |

---

## 8. Flujo de Usuario

### Comprador interesado en un producto

```
1. Usuario llega a Home /
   ↓
2. Ve grid de categorías (ej: "Embocaduras")
   ↓
3. Haz clic en categoría → /categoria/embocaduras
   ↓
4. Ve lista de productos en grid
   ↓
5. Haz clic en producto → /producto/embocaduras/bridones-filete
   ↓
6. Ve detalle completo con foto grande
   ↓
7. Haz clic "Contactar por WhatsApp"
   ↓
8. Se abre wa.me/[NUMERO]?text=Hola, me interesa: Bridones y Filete
   ↓
9. Usuario envía mensaje al vendedor
```

### Proveedor interesado en vender

```
1. Usuario en Home
   ↓
2. Scroll a footer
   ↓
3. Haz clic en "Proveedores" o "Contactar" en footer
   ↓
4. → /contacto-proveedores
   ↓
5. Completa formulario (nombre, email, empresa, mensaje)
   ↓
6. Submit → POST a Formspree
   ↓
7. Formspree envía email a tu cuenta
   ↓
8. Recibe respuesta automática
```

---

## 9. Configuración de Variables de Entorno

**Archivo**: `.env.local` (para desarrollo) o variables en Netlify dashboard

```env
# WhatsApp
VITE_WHATSAPP_NUMERO=+549XXXXXXXXX

# Formspree (formulario de proveedores)
VITE_FORMSPREE_ID=f/xxxxxxxxxxxxx

# Email de contacto general
VITE_EMAIL_CONTACTO=contacto@ejemplo.com

# Email de recepción de formularios
VITE_EMAIL_ADMIN=admin@ejemplo.com
```

**Uso en React**:
```javascript
const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMERO;
```

---

## 10. Estilos con Tailwind CSS

### Configuración
- **Tailwind v3+** instalado
- **Mobile-first**: Estilos por defecto aplican a móvil
- **Breakpoints**: `sm`, `md`, `lg`, `xl`, `2xl`

### Convenciones
- **Tipografía**: `text-sm`, `text-base`, `text-lg`, `font-semibold`
- **Espaciado**: `p-4`, `m-2`, `gap-6`
- **Colores**: Palette de marca a definir (ej: `bg-blue-600`, `text-gray-800`)
- **Componentes comunes**:
  - Botones: `bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded`
  - Cards: `bg-white shadow-md rounded-lg p-4`
  - Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

---

## 11. Deployment

### GitHub Pages

1. Asegurar que `vite.config.js` tiene `base: '/pyluc/`
2. Build: `npm run build`
3. Configurar rama `gh-pages` en GitHub Settings
4. Push: Git push (CI/CD automático con GitHub Actions, si está configurado)

### Netlify

1. Conectar repositorio de GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables de entorno: Agregar en Netlify dashboard
5. Dominio personalizado: DNS → registrador de dominios

---

## 12. Performance & SEO

### Performance
- Vite genera bundles optimizados
- Lazy loading de imágenes: `<img loading="lazy">`
- Caché de servicios web: A definir si se necesita
- Compresión: Netlify comprime automáticamente

### SEO
- Meta tags: A agregar en `public/index.html` o dinámicamente en componentes
- Open Graph: Para compartir en redes (ej: WhatsApp)
- Sitemap: A generar si es necesario para indexación
- Robots.txt: Configurar en `public/`

---

## 13. Testing (Opcional)

Si se requieren tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**Estructura**:
```
src/__tests__/
├── components/
│   ├── Navbar.test.jsx
│   ├── ProductCard.test.jsx
│   └── ...
└── pages/
    ├── Home.test.jsx
    ├── ProductoDetalle.test.jsx
    └── ...
```

**Comando**:
```bash
npm run test          # Run tests
npm run test:ui       # Vitest UI
npm run test:coverage # Coverage report
```

---

## 14. Consideraciones de Mantenimiento

### Agregar un nuevo producto
1. Editar `src/data/productos.json`
2. Subir imagen a `public/images/productos/[categoria]/`
3. Build & deploy

### Cambiar número de WhatsApp
1. Editar `.env.local` (desarrollo) o Netlify dashboard (producción)
2. Rebuild si es necesario

### Cambiar email de contacto
1. Actualizar Formspree en `.env.local`
2. Verificar email en Formspree dashboard

### Agregar una categoría nueva
1. Agregar objeto en array `categorias` de `productos.json`
2. Asegurar que `id` sea unique y URL-safe (ej: `espuelas`, `arneses`)

---

## 15. Troubleshooting Común

| Problema | Solución |
|----------|----------|
| Imágenes no se ven en producción | Verificar que rutas sean absolutas (`/images/...`, no `./`) |
| WhatsApp link no funciona en desktop | Asegurar que el número tenga formato correcto con `+` y código país |
| Formspree no envía emails | Verificar FORM_ID en `.env` y cuenta de Formspree activa |
| Build muy lento | Verificar `productos.json` no sea excesivamente grande |
| Rutas 404 en GitHub Pages | Configurar `404.html` en raíz (Netlify no tiene este problema) |

---

**Última actualización**: May 5, 2026

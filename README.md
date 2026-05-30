# PYLUC - Tienda Online de Artículos de Campo y Equitación

Plataforma estática de e-commerce para venta de artículos de campo, deportes de encuestre y equitación. Desarrollada con **React** y enfocada en navegación intuitiva, catálogo jerárquico y contacto directo con vendedores.

## 🎯 Visión General

**PYLUC** es una tienda digital moderna que permite:
- **Explorar categorías** organizadas jerárquicamente (Embocaduras, Cuchillos, Monturas, etc.)
- **Ver detalles de productos** con imágenes y descripciones
- **Contactar por WhatsApp** directamente desde la página de cada producto
- **Contactar por Email/WhatsApp** desde el footer para consultas generales
- **Formulario de contacto** para nuevos proveedores

---

## 📦 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework** | React 18+ |
| **Build** | Vite |
| **Routing** | React Router v6 |
| **Estilos** | Tailwind CSS |
| **Iconos** | React Icons |
| **Hosting** | Netlify / GitHub Pages |
| **Formularios** | Formspree (contacto de proveedores) |
| **Datos** | JSON estático (sin backend) |

---

## 📂 Estructura de Carpetas

```
pyluc/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   └── productos/
│   │       ├── embocaduras/
│   │       ├── cuchillos/
│   │       ├── monturas/
│   │       └── ...
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── Breadcrumb.jsx
│   │   ├── ContactForm.jsx
│   │   └── HeroSection.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Categoria.jsx
│   │   ├── ProductoDetalle.jsx
│   │   ├── ContactoProveedores.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/
│   │   └── productos.json
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── README.md (este archivo)
├── AGENTS.md (guía para agentes/desarrolladores)
├── ESPECIFICACION.md (detalle técnico completo)
├── ESTRUCTURA_DATOS.md (schema de productos)
├── RUTAS_NAVEGACION.md (mapeo de URLs)
└── COMPONENTES.md (documentación de componentes)
```

---

## 🚀 Quick Start

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/pyluc.git
cd pyluc

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🎨 Características Principales

### 1. **Navegación Jerárquica**
- Navbar con menú desplegable de categorías
- Menú hamburguesa responsivo en móvil
- Breadcrumbs en páginas de categoría y producto

### 2. **Catálogo de Productos**
- 7 categorías principales
- 40+ productos totales
- Búsqueda y exploración intuitiva

### 3. **Contacto Integrado**
- **Botón WhatsApp por producto**: Mensaje prefijado con nombre del artículo
- **Contacto general**: Email y WhatsApp en footer
- **Formulario de proveedores**: Para consultas de nuevos proveedores

### 4. **Responsividad**
- Mobile-first design
- Optimizado para móvil, tablet y desktop
- Performance optimizado

---

## 📋 Categorías de Productos

1. **Embocaduras** (11 tipos)
   - Bridones y Filete, Cuarto de Milla, Portugués, Peñaflor, B8, Patas Cortas, Levantadores, Pessoa, Kimberwick, Pelham, Limitadores

2. **Accesorios de Alpaca**
   - Argollas de alpaca, Argollas retorcidas inox, Argolla pavonada lisa, Argolla de bronce labrada, Argollas de bronce pulido DM, Argollas DM

3. **Cuchillos**
   - Cuchillo carnicería Arbolito, Cuchillo profesional Arbolito Boker, Cuchillo Arbolito Bocker

4. **Riendas y Sujetadores**
   - Claveles cabo negro, Hebillas y dados, Destorcedor y descocedor con argollas

5. **Monturas**
   - Montura freno de oro, Montura de equitación completa, Montura de polo, Equipamiento para turf

6. **Equipamiento del Caballo**
   - Embocadura para caballo de paso peruano, Estribos de acero inox, Frenos consejero con detalles en bronce

7. **Herramientas**
   - Tijera bigornia, Herramienta Mustad tenaza de desvasat, Montureros colgantes y al piso, Perchero para riendas

---

## 📄 Documentación Adicional

- **[AGENTS.md](./AGENTS.md)** - Guía para agentes/desarrolladores (comandos, quirks, setup)
- **[ESPECIFICACION.md](./ESPECIFICACION.md)** - Especificación técnica completa
- **[ESTRUCTURA_DATOS.md](./ESTRUCTURA_DATOS.md)** - Schema y estructura de datos JSON
- **[RUTAS_NAVEGACION.md](./RUTAS_NAVEGACION.md)** - Mapeo de rutas y URLs
- **[COMPONENTES.md](./COMPONENTES.md)** - Documentación de componentes React

---

## 🔗 Integración Externa

### WhatsApp (wa.me)
- Formato: `https://wa.me/[NUMERO]?text=[MENSAJE]`
- Usado en: Botón de producto, contacto general
- Configurable en: `src/data/config.js` (cuando sea creado)

### Email (Formspree)
- Usado en: Formulario de contacto de proveedores
- Endpoint: `https://formspree.io/f/[FORM_ID]`
- Configurable en: Variables de entorno

---

## 🌐 Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Galería de categorías |
| `/categoria/:id` | Lista de productos de una categoría |
| `/producto/:categoriaId/:productoId` | Detalle de producto con botón WhatsApp |
| `/contacto-proveedores` | Formulario de contacto para proveedores |
| `/404` | Página no encontrada |

---

## 🚢 Deployment

### GitHub Pages
```bash
npm run build
# Subir contenido de dist/ a rama gh-pages
```

### Netlify
```bash
# Conectar repositorio en Netlify
# Auto-deploy en cada push a main
```

---

## 📝 Notas Importantes

- **Datos estáticos**: El catálogo se gestiona desde `src/data/productos.json`
- **Sin backend**: La aplicación es completamente estática, sin servidor
- **Contacto**: Los formularios se envían a servicios externos (Formspree para email)
- **Imágenes**: Se almacenan en `public/images/` y se versionan con Git

---

## 👤 Contacto

Para consultas sobre el desarrollo o mantenimiento de PYLUC, contactar a [tu-email@ejemplo.com]

---

**Última actualización**: May 5, 2026

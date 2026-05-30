# PLAN_IMPLEMENTACION.md

Plan detallado de implementación para PYLUC.

---

## 🎯 Objetivo

Crear una tienda online estática de artículos de campo y equitación con navegación jerárquica, catálogo de 40+ productos y contacto directo por WhatsApp y formulario de proveedores.

---

## 📅 Fases de Desarrollo

### Fase 1: Setup Inicial (1-2 horas)

#### 1.1 Crear proyecto Vite + React
```bash
npm create vite@latest pyluc -- --template react
cd pyluc
npm install
```

#### 1.2 Instalar dependencias principales
```bash
# React Router para navegación
npm install react-router-dom

# Tailwind CSS para estilos
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Iconos
npm install react-icons

# Opcional: Formspree (ya incluido en navegador)
```

#### 1.3 Configurar Tailwind
- Editar `tailwind.config.js`
- Definir paleta de colores (a elegir)
- Configurar breakpoints

#### 1.4 Crear estructura de carpetas
```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── HeroSection.jsx
│   ├── Product/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── CategoryCard.jsx
│   └── Contact/
│       └── ContactForm.jsx
├── pages/
│   ├── Home.jsx
│   ├── Categoria.jsx
│   ├── ProductoDetalle.jsx
│   ├── ContactoProveedores.jsx
│   └── NotFound.jsx
├── data/
│   └── productos.json
├── App.jsx
├── main.jsx
└── index.css
```

#### 1.5 Crear .env.local
```env
VITE_WHATSAPP_NUMERO=+549XXXXXXXXX
VITE_FORMSPREE_ID=f/xxxxxxxxxxxxx
VITE_EMAIL_CONTACTO=contacto@pyluc.com
```

---

### Fase 2: Componentes Básicos (4-6 horas)

#### 2.1 Crear Navbar
- Logo + navigation links
- Menú dropdown en desktop
- Menú hamburguesa en móvil
- Responsive con Tailwind

#### 2.2 Crear Footer
- 3 secciones de contacto
- Links a WhatsApp, email, formulario de proveedores
- Copyright

#### 2.3 Crear ProductCard
- Imagen con lazy loading
- Nombre y descripción corta
- Botón "Ver detalles"
- Link a `/producto/:categoriaId/:productoId`

#### 2.4 Crear ProductGrid
- Grid responsivo (1 col móvil, 2 tablet, 3 desktop)
- Componable con ProductCard
- Fallback para lista vacía

#### 2.5 Crear Breadcrumb
- Renderizar ruta de navegación
- Links clickeables
- Item actual sin link

#### 2.6 Crear HeroSection
- Banner con imagen de fondo
- Título, subtítulo
- CTA button

#### 2.7 Crear ContactForm
- Inputs: nombre, email, empresa (proveedores), mensaje
- Validación básica
- POST a Formspree
- Feedback: mensajes de éxito/error
- Loading state

---

### Fase 3: Páginas (4-6 horas)

#### 3.1 Home.jsx
- HeroSection
- Grid de categorías
- Cada categoría es link a `/categoria/:id`

#### 3.2 Categoria.jsx
- Breadcrumb: Home > [Nombre]
- Título + descripción de categoría
- ProductGrid con productos de esa categoría
- Fallback si categoría no existe

#### 3.3 ProductoDetalle.jsx
- Breadcrumb: Home > [Categoria] > [Producto]
- Imagen grande
- Nombre, descripción completa
- Especificaciones (tabla o lista)
- **Botón CTA "Contactar por WhatsApp"**
  - OnClick: Abre `wa.me/[NUMERO]?text=Hola, me interesa: [PRODUCTO]`
- ProductGrid de productos relacionados de la misma categoría
- Fallback si producto no existe

#### 3.4 ContactoProveedores.jsx
- Formulario de contacto con ContactForm
- Información explicativa
- Confirmación de envío

#### 3.5 NotFound.jsx
- Página 404 amigable
- Link a Home

---

### Fase 4: Routing (1-2 horas)

#### 4.1 Crear App.jsx
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Categoria from './pages/Categoria';
import ProductoDetalle from './pages/ProductoDetalle';
import ContactoProveedores from './pages/ContactoProveedores';
import NotFound from './pages/NotFound';
import productos from './data/productos.json';

export default function App() {
  const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMERO;
  const emailContacto = import.meta.env.VITE_EMAIL_CONTACTO;
  
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
```

#### 4.2 Verificar navegación
- Todos los links funcionan
- Parámetros de ruta se pasan correctamente
- 404 se muestra para rutas inválidas

---

### Fase 5: Datos de Productos (2-4 horas)

#### 5.1 Crear src/data/productos.json
- 7 categorías principales
- 40+ productos
- Seguir schema de ESTRUCTURA_DATOS.md
- Verificar IDs son únicos y URL-safe

#### 5.2 Crear estructura de imágenes
```
public/images/
├── logo.png
├── productos/
│   ├── embocaduras/
│   │   ├── bridones-filete.jpg
│   │   ├── cuarto-milla.jpg
│   │   └── ... (9 más)
│   ├── accesorios-alpaca/
│   ├── cuchillos/
│   ├── riendas-sujetadores/
│   ├── monturas/
│   ├── equipamiento-caballo/
│   └── herramientas/
```

#### 5.3 Agregar imágenes
- 40+ imágenes de productos
- Optimizar tamaño (máx. 500KB por imagen)
- Formato: JPG o PNG
- Nombres lowercase con guiones

---

### Fase 6: Integración Externa (2-3 horas)

#### 6.1 Configurar WhatsApp
- Obtener número del vendedor
- Formato: +XX XXXXXXXXXX
- Agregar a .env: VITE_WHATSAPP_NUMERO
- Probar links en ProductoDetalle

#### 6.2 Configurar Formspree
- Crear cuenta en formspree.io
- Crear formulario nuevo
- Obtener FORM_ID
- Agregar a .env: VITE_FORMSPREE_ID
- Probar envío de formulario

#### 6.3 Configurar dominio personalizado
- Decidir entre Netlify o GitHub Pages
- Preparar dominio (comprar si es necesario)
- Configurar DNS cuando sea necesario

---

### Fase 7: Responsive & Testing (2-3 horas)

#### 7.1 Testing en dispositivos
- Móvil (375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1920px+)

#### 7.2 Checklist de responsividad
- [ ] Navbar: Hamburguesa en móvil
- [ ] Footer: Columnas se adaptan
- [ ] ProductCard: Se ven bien en grid
- [ ] ProductoDetalle: Imagen se ajusta
- [ ] ContactForm: Inputs ocupan ancho correcto
- [ ] Texto legible en todos los tamaños
- [ ] Botones tocables (mín. 44px)

#### 7.3 Testing de funcionalidad
- [ ] Links internos funcionan
- [ ] WhatsApp links abren correctamente
- [ ] Formulario se envía a Formspree
- [ ] 404 se muestra para rutas inválidas
- [ ] Imágenes cargan correctamente

---

### Fase 8: Performance & SEO (1-2 horas)

#### 8.1 Performance
- [ ] Build: `npm run build` sin errores
- [ ] Bundle size: < 500KB gzipped (ideal)
- [ ] Lighthouse score: > 90

#### 8.2 SEO
- [ ] Meta tags en public/index.html
- [ ] Open Graph tags (para compartir)
- [ ] Título y descripción claros

#### 8.3 Optimización
- [ ] Lazy loading de imágenes
- [ ] CSS minificado (Vite hace esto automáticamente)
- [ ] JavaScript bundle optimizado

---

### Fase 9: Deploy (1-2 horas)

#### 9.1 Opción A: Netlify (Recomendado)
```bash
# Instalar CLI
npm install -g netlify-cli

# Connect repo
netlify connect

# Configure build
# Build command: npm run build
# Publish directory: dist

# Deploy
npm run build
netlify deploy
```

#### 9.2 Opción B: GitHub Pages
```bash
# Crear repositorio en GitHub
# Agregar remote
git remote add origin https://github.com/usuario/pyluc.git

# Configurar vite.config.js
# base: '/pyluc/'

# Build y deploy
npm run build
# Subir dist/ a rama gh-pages
```

#### 9.3 Configurar dominio personalizado
- En Netlify: Settings > Domain management > Custom domain
- En GitHub Pages: Settings > Pages > Custom domain
- Actualizar DNS en registrador

---

## ⏱️ Estimación de Tiempo Total

| Fase | Tiempo | Subtotal |
|------|--------|----------|
| Setup Inicial | 1-2h | 1-2h |
| Componentes Básicos | 4-6h | 5-8h |
| Páginas | 4-6h | 9-14h |
| Routing | 1-2h | 10-16h |
| Datos de Productos | 2-4h | 12-20h |
| Integración Externa | 2-3h | 14-23h |
| Responsive & Testing | 2-3h | 16-26h |
| Performance & SEO | 1-2h | 17-28h |
| Deploy | 1-2h | 18-30h |

**Total estimado: 18-30 horas** (2-4 días de desarrollo)

---

## 🎯 Milestones Clave

### ✓ Milestone 1: Setup Completo
- Proyecto Vite + React listo
- Estructura de carpetas creada
- Tailwind configurado
- Variables de entorno definidas

### ✓ Milestone 2: Componentes Listos
- Todos los componentes renderizados
- Sin lógica, solo UI
- Responsive funciona

### ✓ Milestone 3: Routing Funcional
- Todas las rutas navegan correctamente
- Parámetros se pasan bien
- 404 funciona

### ✓ Milestone 4: Datos Completos
- JSON con 40+ productos
- Imágenes subidas y referenciadas
- Categorías funcionan

### ✓ Milestone 5: Integraciones Externas
- WhatsApp links abren correctamente
- Formspree envía emails
- Variables de entorno configuradas

### ✓ Milestone 6: Production Ready
- Responsive testeado
- Performance optimizado
- Deploy a producción

---

## 🚨 Riesgos & Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| Imágenes pesan mucho | Alta | Medio | Optimizar con Squoosh/ImageMagick |
| Formspree no funciona | Baja | Alto | Probar en dev, verificar FORM_ID |
| WhatsApp links no abren | Muy Baja | Bajo | URL-encodear mensaje correctamente |
| Responsive falla en algunos dispositivos | Media | Medio | Testing en múltiples devices |
| Deploy falla | Baja | Alto | Verificar build local primero |

---

## 📋 Pre-Requisitos Antes de Empezar

- [ ] Node.js 16+ instalado
- [ ] Git configurado
- [ ] Cuenta GitHub (si usas GitHub Pages)
- [ ] Cuenta Netlify (si usas Netlify)
- [ ] Número WhatsApp del vendedor
- [ ] Cuenta Formspree
- [ ] 40+ imágenes de productos
- [ ] Descripciones de cada producto
- [ ] Logo de empresa
- [ ] Dominio personalizado (opcional)

---

## ✅ Post-Deploy Checklist

- [ ] Dominio personalizado funciona
- [ ] Links internos funcionan en producción
- [ ] WhatsApp links funcionan
- [ ] Formulario envía emails
- [ ] Imágenes cargan rápido
- [ ] Mobile se ve bien
- [ ] 404 funciona
- [ ] SSL certificado activo

---

## 📞 Soporte & Documentación

- **Preguntas generales**: Ver README.md
- **Setup & quirks**: Ver AGENTS.md
- **Arquitectura técnica**: Ver ESPECIFICACION.md
- **Schema de datos**: Ver ESTRUCTURA_DATOS.md
- **Rutas**: Ver RUTAS_NAVEGACION.md
- **Componentes**: Ver COMPONENTES.md

---

**Última actualización**: May 5, 2026

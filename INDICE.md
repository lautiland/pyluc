# 📚 Índice de Documentación - PYLUC

Guía de referencia rápida para navegar la documentación del proyecto.

---

## 📖 Documentos Principales

### 1. **README.md** - Punto de entrada
- **Para**: Desarrolladores nuevos, visión general
- **Contiene**: 
  - Overview del proyecto
  - Stack tecnológico
  - Estructura de carpetas
  - Quick start (npm install, npm run dev)
  - Categorías de productos
- **Lee esto primero**: ✅

### 2. **AGENTS.md** - Guía para agentes/desarrolladores
- **Para**: Agentes, desarrolladores automáticos
- **Contiene**:
  - Comandos clave (npm run dev, npm run build)
  - Estructura del repositorio
  - Flujo de datos y quirks
  - Integración externa (WhatsApp, Formspree)
  - Pitfalls comunes
- **Actualizar cuando**: Cambien comandos, descubrimientos quirks

### 3. **ESPECIFICACION.md** - Detalle técnico completo
- **Para**: Desarrolladores implementando features
- **Contiene**:
  - Arquitectura de la aplicación
  - Flujo de datos completo
  - Stack tecnológico detallado
  - Componentes principales
  - Variables de entorno
  - Performance y SEO
  - Troubleshooting
- **Referencia para**: Decisiones técnicas, debugging

### 4. **ESTRUCTURA_DATOS.md** - Schema JSON
- **Para**: Trabajar con datos de productos
- **Contiene**:
  - Schema de `productos.json`
  - Definición de campos (Categoría, Producto)
  - Convenciones de nombrado
  - Ejemplos completos
  - Rutas de imágenes
  - Validación de datos
- **Consulta antes de**: Agregar/modificar productos

### 5. **RUTAS_NAVEGACION.md** - Mapeo de URLs
- **Para**: Implementar o entender rutas
- **Contiene**:
  - Tabla de rutas con parámetros
  - Definición detallada de cada ruta
  - Árbol de navegación
  - Breadcrumbs
  - Ejemplos de URLs
  - Links internos
  - Integración WhatsApp y Formspree
- **Referencia para**: React Router, navigation

### 6. **COMPONENTES.md** - Documentación de componentes React
- **Para**: Implementar o modificar componentes
- **Contiene**:
  - Componentes de Layout (Navbar, Footer, Breadcrumb)
  - Componentes de Producto (ProductCard, ProductGrid)
  - Componentes de Contacto (ContactForm)
  - Props y estado de cada componente
  - Ejemplos de renderizado
  - Convenciones de estilo (Tailwind)
  - Testing
- **Referencia para**: Desarrollo de componentes

---

## 🎯 Guía Rápida por Tarea

### Quiero empezar el desarrollo
1. Lee **README.md** (overview)
2. Lee **AGENTS.md** (setup y quirks)
3. Ejecuta `npm install && npm run dev`

### Quiero agregar un nuevo producto
1. Abre **ESTRUCTURA_DATOS.md**
2. Agrega entrada a `src/data/productos.json`
3. Sube imagen a `public/images/productos/[categoria]/`
4. Verifica que compile: `npm run build`

### Quiero crear un nuevo componente
1. Consulta **COMPONENTES.md** (existentes)
2. Lee **ESPECIFICACION.md** (arquitectura)
3. Sigue convenciones de props y estado
4. Prueba responsividad

### Quiero entender las rutas
1. Lee **RUTAS_NAVEGACION.md** (completo)
2. Ve tabla de rutas y árbol de navegación
3. Consulta **ESPECIFICACION.md** (flujo de datos)

### Quiero debuggear un problema
1. Consulta **AGENTS.md** (pitfalls comunes)
2. Lee **ESPECIFICACION.md** (troubleshooting)
3. Verifica integración externa (WhatsApp, Formspree)

### Quiero deployar a producción
1. Lee **ESPECIFICACION.md** (deployment)
2. Lee **README.md** (hosting options)
3. Verifica variables de entorno configuradas

---

## 📊 Mapa de Dependencias

```
README.md (START HERE)
    ↓
AGENTS.md (Setup & quirks)
    ↓
ESPECIFICACION.md (Deep dive técnico)
    ├─→ ESTRUCTURA_DATOS.md (JSON schema)
    ├─→ RUTAS_NAVEGACION.md (URL routing)
    └─→ COMPONENTES.md (React components)
```

---

## 📝 Tabla de Referencia Rápida

| Necesito... | Consulta | Sección |
|-------------|----------|---------|
| Iniciar proyecto | README | Quick Start |
| Entender estructura | AGENTS | Repository Structure |
| Ver lista de rutas | RUTAS_NAVEGACION | Tabla de Rutas |
| Schema de productos | ESTRUCTURA_DATOS | Estructura General |
| Agregar componente | COMPONENTES | Componentes Principales |
| Variables de entorno | ESPECIFICACION | Configuración de Env |
| Integración WhatsApp | RUTAS_NAVEGACION | Enlace Externo: WhatsApp |
| Integración Email | RUTAS_NAVEGACION | Enlace Externo: Email (Formspree) |
| Deploy | ESPECIFICACION | Deployment |
| Problema con imágenes | AGENTS | Common Pitfalls |
| Componente reutilizable | COMPONENTES | Importación en App.jsx |

---

## 📋 Checklist para Colaboradores Nuevos

- [ ] Leer **README.md**
- [ ] Leer **AGENTS.md**
- [ ] Ejecutar `npm install && npm run dev`
- [ ] Visitar `http://localhost:5173`
- [ ] Revisar `src/data/productos.json`
- [ ] Revisar `src/App.jsx` (rutas)
- [ ] Leer **ESPECIFICACION.md** (profundidad)
- [ ] Leer **COMPONENTES.md** (antes de desarrollar)
- [ ] Leer **ESTRUCTURA_DATOS.md** (si va a modificar datos)
- [ ] Leer **RUTAS_NAVEGACION.md** (si va a modificar routing)

---

## 🔄 Cuando Actualizar Documentación

| Cambio | Actualizar |
|--------|-----------|
| Nuevo comando disponible | AGENTS.md |
| Cambio en estructura de carpetas | README.md, AGENTS.md |
| Nuevo componente | COMPONENTES.md |
| Nueva ruta | RUTAS_NAVEGACION.md |
| Cambio en schema de datos | ESTRUCTURA_DATOS.md |
| Nuevo quirk descubierto | AGENTS.md, ESPECIFICACION.md |
| Cambio en stack tecnológico | README.md, ESPECIFICACION.md |

---

## 💡 Tips

- **Bookmarquea esta página** para referencia rápida
- **Usa Ctrl+F** en documentos para buscar palabras clave
- **Consulta código** cuando documentación no sea clara
- **Actualiza documentación** cuando descubras nuevos quirks
- **Mantén documentación sincronizada** con cambios en código

---

**Última actualización**: May 5, 2026
**Total de documentos**: 7 archivos
**Tamaño total**: ~58 KB

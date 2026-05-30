# ESTRUCTURA_DATOS.md

Schema y estructura de datos de PYLUC.

---

## 1. Estructura General: `productos.json`

**Ubicación**: `src/data/productos.json`

**Estructura**:
```javascript
{
  "categorias": [
    {
      "id": "string (unique, URL-safe)",
      "nombre": "string",
      "descripcion": "string",
      "imagen": "string (filename en public/images/)",
      "productos": [
        {
          "id": "string (unique dentro de categoría)",
          "nombre": "string",
          "descripcion": "string (descripción detallada)",
          "imagen": "string (filename)",
          "especificaciones": { /* objeto opcional */ }
        }
      ]
    }
  ]
}
```

---

## 2. Definición de Campos

### Categoría

| Campo | Tipo | Requerido | Ejemplo | Notas |
|-------|------|-----------|---------|-------|
| `id` | string | Sí | `"embocaduras"` | URL-safe, lowercase, sin espacios |
| `nombre` | string | Sí | `"Embocaduras"` | Nombre legible para UI |
| `descripcion` | string | No | `"Variedad de embocaduras..."` | Texto informativo |
| `imagen` | string | No | `"embocaduras.jpg"` | Ruta relativa en `public/images/` |
| `productos` | array | Sí | `[{...}, {...}]` | Mínimo 1 producto |

### Producto

| Campo | Tipo | Requerido | Ejemplo | Notas |
|-------|------|-----------|---------|-------|
| `id` | string | Sí | `"bridones-filete"` | URL-safe, debe ser unica en la categoría |
| `nombre` | string | Sí | `"Bridones y Filete"` | Nombre del producto |
| `descripcion` | string | Sí | `"Embocadura de excelente..."` | Descripción completa para detalle |
| `imagen` | string | Sí | `"bridones-filete.jpg"` | Filename (sin path completo) |
| `especificaciones` | object | No | `{ material: "acero", peso: "200g" }` | Atributos opcionales |

---

## 3. Ejemplo Completo

```json
{
  "categorias": [
    {
      "id": "embocaduras",
      "nombre": "Embocaduras",
      "descripcion": "Variedad de embocaduras para diferentes disciplinas ecuestres",
      "imagen": "embocaduras-hero.jpg",
      "productos": [
        {
          "id": "bridones-filete",
          "nombre": "Bridones y Filete",
          "descripcion": "Embocadura versátil de excelente respuesta. Ideal para trabajo general en campo y equitación clásica.",
          "imagen": "bridones-filete.jpg",
          "especificaciones": {
            "material": "Acero inoxidable",
            "peso": "350g",
            "tamaño": "4.5 pulgadas"
          }
        },
        {
          "id": "cuarto-milla",
          "nombre": "Cuarto de Milla",
          "descripcion": "Embocadura diseñada para caballos de cuarto de milla. Mayor control en trabajos intensos.",
          "imagen": "cuarto-milla.jpg",
          "especificaciones": {
            "material": "Acero quirúrgico",
            "peso": "400g",
            "tamaño": "5 pulgadas"
          }
        }
      ]
    },
    {
      "id": "cuchillos",
      "nombre": "Cuchillos",
      "descripcion": "Cuchillos profesionales de marca Arbolito, ideales para faena y trabajo de campo",
      "imagen": "cuchillos-hero.jpg",
      "productos": [
        {
          "id": "carniceria-arbolito",
          "nombre": "Cuchillo Carnicería Arbolito",
          "descripcion": "Cuchillo tradicional de carnicería, hoja de acero forjado de gran durabilidad.",
          "imagen": "cuchillo-carniceria.jpg",
          "especificaciones": {
            "marca": "Arbolito",
            "largo_hoja": "20cm",
            "material_mango": "Madera de ébano"
          }
        }
      ]
    }
  ]
}
```

---

## 4. Convenciones de Nombrado

### IDs de Categoría (categorias[].id)
- Lowercase
- Sin espacios (usar guiones)
- URL-safe
- Descriptivo en singular o plural

**Ejemplos correctos**:
- `embocaduras` ✓
- `accesorios-alpaca` ✓
- `equipamiento-caballo` ✓

**Ejemplos incorrectos**:
- `Embocaduras` ✗ (mayúsculas)
- `embocaduras frenos` ✗ (espacio)
- `embocaduras%20filete` ✗ (encoding)

### IDs de Producto (categorias[].productos[].id)
- Lowercase
- Sin espacios (usar guiones)
- Unico dentro de la categoría
- Descriptivo pero conciso

**Ejemplos**:
- `bridones-filete`
- `cuarto-milla`
- `portugues`
- `carniceria-arbolito`

### Nombres (nombre)
- Formato legible (Palabras Capitalizadas)
- Sin caracteres especiales (excepto guiones, puntos)
- Máximo 60 caracteres

### Descripciones (descripcion)
- Texto completo, profesional
- 100-500 caracteres recomendado
- Puede incluir detalles técnicos
- Sin saltos de línea (usar `\n` si es necesario)

### Filenames de Imagen (imagen)
- Lowercase
- Sin espacios (usar guiones)
- Extensión: `.jpg`, `.png`
- Descriptivo

**Ejemplos**:
- `bridones-filete.jpg`
- `cuchillo-carniceria.jpg`
- `montura-polo.png`

---

## 5. Especificaciones (Objeto Opcional)

Las `especificaciones` permiten agregar atributos personalizados por producto.

**Estructura sugerida**:
```javascript
"especificaciones": {
  "material": "Acero inoxidable",
  "peso": "200g",
  "tamaño": "4 pulgadas",
  "color": "Plateado",
  "disponibilidad": "En stock",
  "garantia": "2 años"
}
```

**Uso en componentes**:
```javascript
{producto.especificaciones && (
  <div className="especificaciones">
    {Object.entries(producto.especificaciones).map(([key, value]) => (
      <p key={key}><strong>{key}:</strong> {value}</p>
    ))}
  </div>
)}
```

---

## 6. Rutas de Imágenes

### Estructura de carpetas

```
public/
└── images/
    ├── logo.png
    ├── embocaduras-hero.jpg
    └── productos/
        ├── embocaduras/
        │   ├── bridones-filete.jpg
        │   ├── cuarto-milla.jpg
        │   └── ...
        ├── cuchillos/
        │   ├── carniceria-arbolito.jpg
        │   └── ...
        ├── monturas/
        │   ├── montura-polo.jpg
        │   └── ...
        └── ... (otras categorías)
```

### Referencia en JSX

```javascript
// Para imágenes de categoría en Home
<img src={`/images/productos/${categoria.imagen}`} />

// Para imágenes de producto en ProductCard o ProductoDetalle
<img src={`/images/productos/${categoriaId}/${producto.imagen}`} />

// Para logo en Navbar
<img src="/images/logo.png" alt="PYLUC Logo" />
```

**Nota importante**: Las rutas deben ser absolutas (comienzan con `/`), no relativas, para que funcionen tanto en dev como en producción.

---

## 7. Validación de Datos

### Checklist para nuevo producto

- [ ] ID es unique en la categoría y URL-safe
- [ ] Nombre no excede 60 caracteres
- [ ] Descripción es clara y profesional
- [ ] Imagen existe en la carpeta correcta
- [ ] Filename de imagen es lowercase con guiones
- [ ] Especificaciones (si existen) son objects simples (string key/value)

### Checklist para nueva categoría

- [ ] ID es unique globalmente y URL-safe
- [ ] Nombre es descriptivo y capitalizado
- [ ] Descripción existe y es informativa
- [ ] Tiene al menos 1 producto
- [ ] Imagen de categoría (opcional pero recomendada) existe

---

## 8. Limitaciones Actuales

- **Tamaño máximo de JSON**: No hay límite técnico, pero >1MB puede afectar performance
- **Máximo de categorías**: Sin límite, pero recomendado <20
- **Máximo de productos**: Sin límite, pero recomendado <500
- **Caracteres especiales**: Evitar en IDs; permitidos en nombres/descripciones

---

## 9. Ejemplos de Categorías Completas

### Embocaduras (11 productos)

```json
{
  "id": "embocaduras",
  "nombre": "Embocaduras",
  "descripcion": "Variedad de embocaduras para diferentes disciplinas ecuestres",
  "productos": [
    {
      "id": "bridones-filete",
      "nombre": "Bridones y Filete",
      "descripcion": "Embocadura versátil de excelente respuesta",
      "imagen": "bridones-filete.jpg"
    },
    {
      "id": "cuarto-milla",
      "nombre": "Cuarto de Milla",
      "descripcion": "Diseñada para caballos de cuarto de milla",
      "imagen": "cuarto-milla.jpg"
    },
    {
      "id": "portugues",
      "nombre": "Portugués",
      "descripcion": "Embocadura tradicional portuguesa de gran efecto",
      "imagen": "portugues.jpg"
    },
    {
      "id": "penaflor",
      "nombre": "Peñaflor",
      "descripcion": "Embocadura de freno americano con excelente control",
      "imagen": "penaflor.jpg"
    },
    {
      "id": "b8",
      "nombre": "B8",
      "descripcion": "Embocadura moderna de acero inoxidable",
      "imagen": "b8.jpg"
    },
    {
      "id": "patas-cortas",
      "nombre": "Patas Cortas",
      "descripcion": "Embocadura con palancas cortas para efectos suaves",
      "imagen": "patas-cortas.jpg"
    },
    {
      "id": "levantadores",
      "nombre": "Levantadores",
      "descripcion": "Embocadura con levantadores para acción levantante",
      "imagen": "levantadores.jpg"
    },
    {
      "id": "pessoa",
      "nombre": "Pessoa",
      "descripcion": "Embocadura clásica de excelente respuesta",
      "imagen": "pessoa.jpg"
    },
    {
      "id": "kimberwick",
      "nombre": "Kimberwick",
      "descripcion": "Embocadura inglesa de gran versatilidad",
      "imagen": "kimberwick.jpg"
    },
    {
      "id": "pelham",
      "nombre": "Pelham",
      "descripcion": "Embocadura de doble efecto para trabajo avanzado",
      "imagen": "pelham.jpg"
    },
    {
      "id": "limitadores",
      "nombre": "Limitadores",
      "descripcion": "Embocadura con limitadores para control preciso",
      "imagen": "limitadores.jpg"
    }
  ]
}
```

---

## 10. Importación en React

```javascript
// App.jsx o en cualquier componente
import productos from '../data/productos.json';

// Acceso a todas las categorías
console.log(productos.categorias);

// Filtrar categoría específica
const embocaduras = productos.categorias.find(c => c.id === 'embocaduras');

// Acceder a un producto específico
const bridon = embocaduras.productos.find(p => p.id === 'bridones-filete');
```

---

**Última actualización**: May 5, 2026

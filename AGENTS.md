# AGENTS.md

Agent instructions for the `pyluc` repository. Tienda online estática de artículos de campo y equitación.

## Quick setup

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

**Required env vars**: None. Fully static site with external service integrations (Formspree for email, wa.me for WhatsApp).

## Key commands

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Format & lint | `npm run lint` (if configured) |

## Repository structure

**Single-package React + Vite app** (not a monorepo).

- `src/pages/` - Page components (Home, Categoria, ProductoDetalle, etc.)
- `src/components/` - Reusable components (Navbar, Footer, ProductCard, etc.)
- `src/data/productos.json` - **Catalog data source** (flat JSON, no backend)
- `public/images/` - Product images and assets

**Real entrypoints:**
- `src/main.jsx` - React mount point
- `src/App.jsx` - Route definitions (React Router v6)
- `src/pages/Home.jsx` - Landing page

## Execution flow & quirks

### Data structure
- Products are organized in `src/data/productos.json` with hierarchical categories
- Each product has: `id`, `nombre`, `descripcion`, `imagen`, `categoriaId`
- Categories have: `id`, `nombre`, `descripcion`, `productos[]`
- **NO backend**; data is bundled at build time

### Routing with React Router
- Routes defined in `src/App.jsx`
- URL params: `/:categoriaId` and `/:categoriaId/:productoId`
- 404 handled via `<Route path="*" element={<NotFound />} />`

### External integrations
- **WhatsApp**: `wa.me/[NUMERO]?text=[MENSAJE]` - configure in component props or config
- **Email (formulario de proveedores)**: Formspree integration - needs FORM_ID in env or hardcoded
- **Images**: Static files in `public/images/` - reference as `/images/productos/...`

### Build & deployment quirks
- Vite outputs to `dist/`
- GitHub Pages or Netlify: deploy `dist/` folder
- Custom domain: configure DNS or Netlify settings
- No pre-rendering needed (all routes are static via React Router)

## Existing instruction files

- `README.md` - Project overview and quick start
- `ESPECIFICACION.md` - Full technical specification
- `ESTRUCTURA_DATOS.md` - JSON schema and data structure
- `RUTAS_NAVEGACION.md` - URL routing map
- `COMPONENTES.md` - Component documentation

## Testing & quality

No tests configured yet. If needed:
- Use **Vitest** (fast, Vite-native)
- Use **React Testing Library** for component tests
- Store tests in `src/__tests__/` or co-locate with components

## Common pitfalls to avoid

1. **Image paths**: Always use `/images/...` (not `./` or `../`) - they must work in both dev and production
2. **JSON imports**: Use dynamic imports or fetch for `productos.json` if bundled size becomes an issue
3. **Mobile responsiveness**: Tailwind classes are mobile-first; test on actual devices before deploy
4. **WhatsApp links**: URL-encode special characters in query params; use `encodeURIComponent()`
5. **Formspree**: Verify FORM_ID is correct; test form submission before launch

---

*Keep this concise. One fact per bullet. If docs conflict with config, trust the executable source.*

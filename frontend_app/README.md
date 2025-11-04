# Recipe Explorer (LightningJS / Blits)

A modern Recipe Explorer frontend using Lightning 3 (Blits) with the Ocean Professional theme.

- Home page: top search bar and responsive grid of recipe cards
- Details page: hero image, ingredients list, and steps
- Data service: uses VITE_API_BASE if present; otherwise uses in-memory mock data
- Graceful loading, empty, and error states
- Client-side routing between list and detail using Blits Router

## Run
- Port: 3000
- npm install
- npm run dev

Open the provided localhost:3000 link.

## Environment Variables (Vite)
- VITE_API_BASE: If provided, endpoints:
  - GET `${VITE_API_BASE}/recipes?search=...`
  - GET `${VITE_API_BASE}/recipes/:id`
- Other supported (not directly used here but available):
  - VITE_BACKEND_URL, VITE_FRONTEND_URL, VITE_WS_URL, VITE_NODE_ENV
  - VITE_NEXT_TELEMETRY_DISABLED, VITE_ENABLE_SOURCE_MAPS, VITE_PORT
  - VITE_TRUST_PROXY, VITE_LOG_LEVEL, VITE_HEALTHCHECK_PATH
  - VITE_FEATURE_FLAGS, VITE_EXPERIMENTS_ENABLED

## Assets
- Images are referenced from `public/assets`. Placeholder files are included. Replace them with real images when available.

## Structure
- src/App.js: Application root and router setup
- src/index.js: Blits.Launch config with key mappings
- src/pages/HomeScreen.js: Search + grid of recipe cards
- src/pages/Details.js: Recipe details (ingredients + steps)
- src/components/*: SearchBar, Grid, RecipeCard, Spinner, ErrorState, EmptyState, Tag
- src/data/dataService.js: API/mock data abstraction
- src/theme/*: Theme tokens and utilities

import mockRecipes from './mockData'

/**
// PUBLIC_INTERFACE
 */
export async function getRecipes(query = '') {
  /**
   * Fetch recipes either from API (if VITE_API_BASE is set) or from mock data.
   * - API: GET `${VITE_API_BASE}/recipes?search=${query}`
   * Returns: [{ id, title, description, image, tags }]
   */
  const base = import.meta.env?.VITE_API_BASE
  if (base) {
    const url = `${base.replace(/\/$/, '')}/recipes${query ? `?search=${encodeURIComponent(query)}` : ''}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch recipes: ${res.status}`)
    }
    return res.json()
  }

  // Mock filtering
  const q = query.trim().toLowerCase()
  if (!q) return mockRecipes
  return mockRecipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.tags || []).some((t) => t.toLowerCase().includes(q))
  )
}

/**
// PUBLIC_INTERFACE
 */
export async function getRecipeById(id) {
  /**
   * Fetch single recipe either from API or mock.
   * - API: GET `${VITE_API_BASE}/recipes/:id`
   * Returns: { id, title, description, image, tags, ingredients, steps }
   */
  const base = import.meta.env?.VITE_API_BASE
  if (base) {
    const url = `${base.replace(/\/$/, '')}/recipes/${encodeURIComponent(id)}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status}`)
    }
    return res.json()
  }

  return mockRecipes.find((r) => r.id === String(id))
}

/**
 * Ocean Professional Theme tokens
 * Centralized design tokens for color, spacing, radii, and shadows.
 * Colors align with the provided style guide.
 */
const colors = {
  primary: 0x2563ebff, // Blue 600
  primarySoft: 0x60a5faff, // Blue 400
  secondary: 0xf59e0bff, // Amber 500
  background: 0xf9fafbff, // Gray-50
  surface: 0xffffffff, // White
  text: 0x000000ff, // Force black text globally per requirement
  textMuted: 0x000000ff, // Use black for all text variants as requested
  error: 0xef4444ff, // Red-500
  overlay: 0x00000033, // black 20%
}

const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
}

const shadows = {
  // Soft elevation using alpha overlays
  sm: { color: colors.overlay, blur: 8, spread: 0 },
  md: { color: colors.overlay, blur: 12, spread: 0 },
  lg: { color: colors.overlay, blur: 18, spread: 0 },
}

/**
// PUBLIC_INTERFACE
 */
export function applyTheme(app) {
  /** Apply theme to app instance if needed in future (placeholder). */
  return app
}

export default {
  colors,
  spacing,
  radii,
  shadows,
}

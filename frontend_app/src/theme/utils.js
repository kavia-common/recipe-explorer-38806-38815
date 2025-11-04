import theme from './theme'

/**
 * Utility helpers for styling commonly used elements like cards or panels.
 */

// PUBLIC_INTERFACE
export function cardStyle({ w = 420, h = 280, radius = theme.radii.lg } = {}) {
  return { w, h, radius, color: theme.colors.surface }
}

// PUBLIC_INTERFACE
export function gradientOverlay({ w, h, alpha = 0.12 }) {
  // simulate a subtle gradient with a semi-transparent overlay element
  return {
    w,
    h,
    color: (theme.colors.primary & 0xffffff) | Math.floor(alpha * 255),
  }
}

// PUBLIC_INTERFACE
export function focusRing({ w, h, radius = theme.radii.md, show = false }) {
  return {
    w,
    h,
    radius,
    color: show ? theme.colors.primary : 0x00000000,
    alpha: show ? 0.45 : 0,
  }
}

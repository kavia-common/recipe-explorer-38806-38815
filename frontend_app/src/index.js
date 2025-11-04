import Blits from '@lightningjs/blits'
import App from './App'

Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  debug: false,
  keys: {
    // Basic mappings; CI/browser default arrows/enter/backspace
    enter: 'Enter',
    back: 'Backspace',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
  },
})

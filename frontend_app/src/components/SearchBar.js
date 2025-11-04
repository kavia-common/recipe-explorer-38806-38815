import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

/**
 * Simple search bar with a faux input element.
 * Lightning does not use DOM; we simulate text entry using input handlers.
 */
export default Blits.Component('SearchBar', {
  props: ['placeholder', 'onSearch'],
  state() {
    return {
      value: '',
      focused: false,
      caretVisible: true,
      caretTimer: null,
    }
  },
  components: {},
  template: `
    <Element w="1520" h="80" :color="${theme.colors.surface}" radius="${theme.radii.lg}">
      <!-- Outline when focused -->
      <Element
        x="-4" y="-4" 
        w="1528" h="88"
        :color="${theme.colors.primary}"
        radius="${theme.radii.lg + 2}"
        :alpha="$focused ? 0.35 : 0"
      />
      <!-- Magnifier icon substitute -->
      <Element x="24" y="22" w="36" h="36" :color="${theme.colors.primarySoft}" radius="18" />
      <Text
        x="80"
        y="26"
        :content="$valueDisplay"
        :textColor="${theme.colors.text}"
        fontFace="Regular"
        fontSize="28"
      />
      <Element :x="$caretX" y="24" w="2" h="32" :color="${theme.colors.text}" :alpha="$showCaret ? 1 : 0"/>
      <Text
        x="80"
        y="26"
        :content="$placeholderText"
        :alpha="$value.length ? 0 : 0.5"
        :textColor="${theme.colors.text}"
        fontFace="Regular"
        fontSize="28"
      />
    </Element>
  `,
  computed: {
    valueDisplay() {
      return this.value
    },
    caretX() {
      // Simple estimate: 16 px per character at fontSize 28
      return 80 + Math.max(0, this.value.length) * 16
    },
    showCaret() {
      return this.focused && this.caretVisible
    },
    placeholderText() {
      return this.placeholder || 'Search recipes...'
    },
  },
  methods: {
    _startCaretBlink() {
      if (this.caretTimer) return
      this.caretTimer = setInterval(() => {
        this.caretVisible = !this.caretVisible
      }, 500)
    },
    _stopCaretBlink() {
      if (this.caretTimer) {
        clearInterval(this.caretTimer)
        this.caretTimer = null
      }
      this.caretVisible = true
    },
    // PUBLIC_INTERFACE
    clear() {
      /** Clear input text and notify parent for a refresh. */
      this.value = ''
      if (typeof this.onSearch === 'function') this.onSearch(this.value)
    },
    // PUBLIC_INTERFACE
    setValue(v) {
      /** Programmatically set value in the field (used to hydrate from query). */
      this.value = v || ''
    },
    // PUBLIC_INTERFACE
    submit() {
      /** Trigger search callback. */
      if (typeof this.onSearch === 'function') this.onSearch(this.value)
    },
  },
  focus() {
    this.focused = true
    this._startCaretBlink()
  },
  unfocus() {
    this.focused = false
    this._stopCaretBlink()
  },
  input: {
    enter() {
      // Submit search
      if (typeof this.onSearch === 'function') this.onSearch(this.value)
    },
    back() {
      // Clear text if any, else bubble up
      if (this.value && this.value.length) {
        this.value = ''
        if (typeof this.onSearch === 'function') this.onSearch(this.value)
      } else {
        this.parent.focus && this.parent.focus()
      }
    },
    left() {
      // No-op for simplicity
    },
    right() {
      // No-op
    },
    up() {},
    down() {},
    // Handle alphanumeric keys
    // Lightning passes key data in event; we accept printable chars and handle Delete
    // For CI, we'll support letters, numbers, space, and basic punctuation.
    $raw(e) {
      const { key } = e || {}
      if (!key) return
      if (key === 'Backspace') {
        this.value = this.value.slice(0, -1)
        return
      }
      if (key.length === 1 && this.value.length < 60) {
        // Limit length to avoid overflow
        this.value = this.value + key
      }
    },
  },
})

import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('Spinner', {
  props: ['label'],
  state() {
    return { angle: 0 }
  },
  template: `
    <Element w="200" h="200" alpha="0.9">
      <!-- Use static color token and avoid inline object/unsupported bindings -->
      <Element x="80" y="80" w="40" h="40" color="0x2563ebff" radius="20" />
      <Text x="0" y="160" textColor="0x000000ff" fontSize="22" :content="$labelText" />
    </Element>
  `,
  computed: {
    labelText() {
      return this.label && this.label.length ? this.label : 'Loading...'
    },
  },
  onMounted() {
    // Keep timer to simulate motion if needed in future; template animation removed to satisfy precompiler
    this._timer = setInterval(() => {
      this.angle = (this.angle + 0.2) % (Math.PI * 2)
    }, 120)
  },
  onDestroyed() {
    if (this._timer) clearInterval(this._timer)
  },
})

import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('Spinner', {
  props: ['label'],
  state() {
    return { angle: 0 }
  },
  template: `
    <Element w="200" h="200" alpha="0.9">
      <Element x="80" y="80" w="40" h="40" :color="$primaryColor" radius="20" :rotation="$angle" />
      <Text x="0" y="160" :textColor="$textColor" fontSize="22" :content="$labelText" />
    </Element>
  `,
  computed: {
    primaryColor() { return theme.colors.primary },
    textColor() { return theme.colors.text },
    labelText() {
      return this.label && this.label.length ? this.label : 'Loading...'
    },
  },
  onMounted() {
    this._timer = setInterval(() => {
      this.angle = (this.angle + 0.2) % (Math.PI * 2)
    }, 16)
  },
  onDestroyed() {
    if (this._timer) clearInterval(this._timer)
  },
})

import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('Spinner', {
  props: ['label'],
  state() {
    return { angle: 0 }
  },
  template: `
    <Element w="200" h="200" alpha="0.9">
      <Element x="80" y="80" w="40" h="40" :color="${theme.colors.primary}" radius="20" :rotation="$angle" />
      <Text x="0" y="160" :textColor="${theme.colors.text}" fontSize="22" :content="$labelText" />
    </Element>
  `,
  computed: {
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
```

Explanation: Create ErrorState and EmptyState components for graceful messaging
````write file="recipe-explorer-38806-38815/frontend_app/src/components/ErrorState.js"
import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('ErrorState', {
  props: ['message'],
  template: `
    <Element w="1200" h="200" :color="${theme.colors.surface}" radius="${theme.radii.lg}" alpha="0.95">
      <Element x="-4" y="-4" w="1208" h="208" :color="${theme.colors.error}" radius="${theme.radii.lg + 2}" alpha="0.25"/>
      <Text x="32" y="32" w="1136" h="136" fontSize="28" :textColor="${theme.colors.text}" :content="$msg" />
    </Element>
  `,
  computed: {
    msg() {
      return this.message || 'Something went wrong. Please try again.'
    },
  },
})

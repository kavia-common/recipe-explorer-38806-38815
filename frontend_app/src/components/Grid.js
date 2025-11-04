import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

/**
 * Simple fixed grid for 1920x1080 canvas.
 *  - Card size ~ 420x280, gap 24, columns 3 or 4 depending on width.
 */
export default Blits.Component('Grid', {
  props: ['items', 'renderItem'],
  state() {
    return {
      cols: 3,
      gap: theme.spacing.lg,
      cardW: 420,
      cardH: 280,
    }
  },
  template: `
    <Element w="1600" h="800">
      <Element
        :for="(item, idx) in $items"
        :key="$item.id"
        :x="$xPos($index)"
        :y="$yPos($index)"
        :w="$cardW"
        :h="$cardH"
      >
        <Element :is="$renderItem" :item="$item" :w="$cardW" :h="$cardH" />
      </Element>
    </Element>
  `,
  methods: {
    xPos(i) {
      const c = i % this.cols
      return c * (this.cardW + this.gap)
    },
    yPos(i) {
      const r = Math.floor(i / this.cols)
      return r * (this.cardH + this.gap)
    },
  },
})

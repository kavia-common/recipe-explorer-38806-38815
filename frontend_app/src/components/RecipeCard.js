import Blits from '@lightningjs/blits'
import theme from '../theme/theme'

export default Blits.Component('RecipeCard', {
  props: ['item', 'w', 'h'],
  state() {
    return {
      hovered: false,
    }
  },
  template: `
    <Element :w="$w" :h="$h" :color="${theme.colors.surface}" radius="${theme.radii.lg}" :alpha="$hovered ? 1 : 0.98" >
      <Element x="-3" y="-3" :w="$w + 6" :h="$h + 6" :color="${theme.colors.primary}" radius="${theme.radii.lg + 2}" :alpha="$hovered ? 0.35 : 0" />
      <Element x="0" y="0" :w="$w" h="160" :src="$item && $item.image ? $item.image : 'assets/placeholder.jpg'" />
      <Text x="16" y="176" :content="$item && $item.title ? $item.title : ''" fontSize="24" :textColor="${theme.colors.text}" />
      <Text x="16" y="210" :content="$desc" fontSize="20" :textColor="${theme.colors.textMuted}" alpha="0.9" />
    </Element>
  `,
  computed: {
    desc() {
      const t = (this.item?.description || '').trim()
      if (t.length <= 48) return t
      return t.slice(0, 48) + '…'
    },
  },
  input: {
    enter() {
      if (this.item && this.item.id) {
        this.$router.to(`/details/${this.item.id}`)
      }
    },
  },
  focus() {
    this.hovered = true
  },
  unfocus() {
    this.hovered = false
  },
})
